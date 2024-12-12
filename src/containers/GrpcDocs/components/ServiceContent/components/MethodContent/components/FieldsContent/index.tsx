import React from "react";
import { Card, Flex, Text } from "@mantine/core";
import { ProtoField } from "../../../../../../../../types";
import { Field } from "../../../../../../../../components/Field";

export interface FieldsContentProps {
  title: React.ReactNode;
  fields: ProtoField[];
}

export const FieldsContent: React.FC<FieldsContentProps> = ({
  title,
  fields,
}) => {
  return (
    <Card bg="gray.1">
      <Flex direction="column" gap="xs">
        <Text fw={500}>{title}:</Text>

        <Flex direction="column">
          {fields.map((field) => (
            <Field key={field.name} field={field} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
