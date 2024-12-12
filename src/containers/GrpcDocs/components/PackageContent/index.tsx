import React from "react";
import { Flex, Text } from "@mantine/core";
import { ProtoPackageContext } from "../../../../types";
import { useOutletContext } from "react-router";
import { ServiceOverview } from "./components/ServiceOverview";

export const PackageContent: React.FC = () => {
  const { protoPackage, error } = useOutletContext<ProtoPackageContext>();

  if (error) {
    return <Text c="red">Can't parse the .proto file</Text>;
  }
  if (!protoPackage) return <>Loading...</>;

  return (
    <Flex direction="column" gap="md">
      {protoPackage.services.map((service) => (
        <ServiceOverview key={service.name} service={service} />
      ))}
    </Flex>
  );
};
