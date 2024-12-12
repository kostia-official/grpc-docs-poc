import React from "react";
import { ProtoService } from "../../../../../../types";
import { Flex } from "@mantine/core";
import { MethodContent } from "../../../ServiceContent/components/MethodContent";

export interface ServiceOverviewProps {
  service: ProtoService;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  service,
}) => {
  return (
    <Flex direction="column" gap="xs">
      {service.name}

      {service.methods.map((method) => (
        <MethodContent key={method.name} method={method} withFields={false} />
      ))}
    </Flex>
  );
};
