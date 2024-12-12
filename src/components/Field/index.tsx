import React from "react";
import { ProtoField } from "../../types";
import { Flex, Text } from "@mantine/core";

export interface FieldProps {
  field: ProtoField;
}

export const Field: React.FC<FieldProps> = ({ field }) => {
  return (
    <Flex direction="column">
      <Text>
        {field.name}:{" "}
        <Text c="gray.6" component="span">
          {field.type}
          {field.repeated ? "[]" : ""}
        </Text>
      </Text>

      <Flex direction="column" ml="sm">
        {field.reference?.fields.map((field) => (
          <Field key={field.name} field={field} />
        ))}
      </Flex>
    </Flex>
  );
};
