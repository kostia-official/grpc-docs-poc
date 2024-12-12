import React from "react";
import { ProtoMethod } from "../../../../../../types";
import { Card, Flex, Text } from "@mantine/core";
import { FieldsContent } from "./components/FieldsContent";
import { useScrollToHash } from "../../../../../../hooks/useScrollToHash";

export interface MethodContentProps {
  method: ProtoMethod;
  withFields?: boolean;
}

export const MethodContent: React.FC<MethodContentProps> = ({
  method,
  withFields = true,
}) => {
  useScrollToHash({ offset: 70 });

  return (
    <Card id={method.name} withBorder>
      <Flex direction="column" gap="xs">
        <Text>{method.name}</Text>

        {!!withFields && (
          <>
            <FieldsContent
              key="input"
              title={method.inputMessage.name}
              fields={method.inputMessage.fields}
            />

            <FieldsContent
              key="output"
              title={method.outputMessage.name}
              fields={method.outputMessage.fields}
            />
          </>
        )}
      </Flex>
    </Card>
  );
};
