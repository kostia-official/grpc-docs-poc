import React, { useMemo } from "react";
import { useOutletContext, useParams } from "react-router";
import { Flex, Title } from "@mantine/core";
import { ProtoPackageContext } from "../../../../types";
import { MethodContent } from "./components/MethodContent";

export const ServiceContent: React.FC = () => {
  const { name: serviceName } = useParams();
  const { protoPackage, isLoading, error } =
    useOutletContext<ProtoPackageContext>();

  const service = useMemo(() => {
    return protoPackage?.services.find((item) => item.name === serviceName);
  }, [protoPackage, serviceName]);

  if (error) return <></>;
  if (isLoading || !service) return <>Loading...</>;

  return (
    <Flex direction="column" gap="md">
      <Title order={4}>{service.name}</Title>

      <Flex direction="column" gap="xs">
        {service.methods.map((method) => (
          <MethodContent key={method.name} method={method} />
        ))}
      </Flex>
    </Flex>
  );
};
