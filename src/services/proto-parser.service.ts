import * as protobuf from "protobufjs";
import {
  ProtoField,
  ProtoMessage,
  ProtoMethod,
  ProtoPackage,
  ProtoService,
} from "../types";

export class ProtoParserService {
  parseProtoMessages(nested: {
    [k: string]: protobuf.ReflectionObject;
  }): ProtoMessage[] {
    const messages: ProtoMessage[] = [];

    Object.values(nested).forEach((value) => {
      if (value instanceof protobuf.Type) {
        const fields: ProtoField[] = Object.entries(value.fields).map(
          ([fieldName, fieldDef]: [string, protobuf.Field]) => {
            const isReference = nested[fieldDef.type] instanceof protobuf.Type;

            return {
              name: fieldName,
              type: fieldDef.type,
              repeated: fieldDef.repeated,
              reference: isReference
                ? {
                    name: fieldDef.type,
                    fields: Object.entries(
                      (nested[fieldDef.type] as protobuf.Type).fields
                    ).map(([refFieldName, refFieldDef]) => ({
                      name: refFieldName,
                      type: refFieldDef.type,
                      repeated: refFieldDef.repeated,
                    })),
                  }
                : undefined,
            };
          }
        );

        messages.push({ name: value.name, fields });
      }
    });

    return messages;
  }

  parseProtoServices(
    nested: { [k: string]: protobuf.ReflectionObject },
    messages: ProtoMessage[]
  ): ProtoService[] {
    const services: ProtoService[] = [];

    const getFields = (typeName: string): ProtoField[] => {
      const message = messages.find((msg) => msg.name === typeName);
      return message ? message.fields : [];
    };

    Object.values(nested).forEach((value) => {
      if (value instanceof protobuf.Service) {
        const methods: ProtoMethod[] = Object.values(value.methods).map(
          (method) => ({
            name: method.name,
            inputMessage: {
              name: method.requestType,
              fields: getFields(method.requestType),
            },
            outputMessage: {
              name: method.responseType,
              fields: getFields(method.responseType),
            },
          })
        );
        services.push({ name: value.name, methods });
      }
    });

    return services;
  }

  async parseProtoFile(protoContent: string): Promise<ProtoPackage> {
    const { root } = protobuf.parse(protoContent);

    if (!root.nested) {
      throw new Error("Invalid proto file: No nested definitions found.");
    }

    let packageName = "default";
    let messages: ProtoMessage[] = [];
    let services: ProtoService[] = [];

    const [packageDef] = Object.values(root.nested);

    if (packageDef instanceof protobuf.Namespace) {
      packageName = packageDef.name;

      if (!packageDef.nested) {
        throw new Error(
          `Invalid package "${packageName}": No nested definitions.`
        );
      }

      messages = this.parseProtoMessages(packageDef.nested);
      services = this.parseProtoServices(packageDef.nested, messages);
    } else {
      throw new Error("Proto file must define a package.");
      // TODO: Cover this case
    }

    return { name: packageName, messages, services };
  }

  async fetchProtoFile(fileUrl: string): Promise<string> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch proto file: ${response.statusText}`);
    }
    return await response.text();
  }
}

export const protoParserService = new ProtoParserService();
