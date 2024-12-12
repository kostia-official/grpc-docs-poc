export interface ProtoField {
  name: string;
  type: string;
  repeated: boolean;
  reference?: ProtoMessage;
}

export interface ProtoMessage {
  name: string;
  fields: ProtoField[];
}

export interface ProtoMethod {
  name: string;
  inputMessage: ProtoMessage;
  outputMessage: ProtoMessage;
}

export interface ProtoService {
  name: string;
  methods: ProtoMethod[];
}

export interface ProtoPackage {
  name: string;
  messages: ProtoMessage[];
  services: ProtoService[];
}

export interface ProtoPackageContext {
  protoPackage?: ProtoPackage;
  isLoading: boolean;
  error?: Error;
}
