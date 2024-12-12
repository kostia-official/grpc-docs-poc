import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { protoParserService } from "../../services/proto-parser.service";
import { Outlet, useNavigate } from "react-router";
import { AppShell } from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { FileUrlInput } from "./components/FileUrlInput";
import { ProtoPackageContext } from "../../types";

export const GrpcDocs: React.FC = () => {
  const navigate = useNavigate();

  const [fileUrl, setFileUrl] = useState<string>(
    `${window.location.origin}/example.proto`
  );

  const {
    data: protoPackage,
    isLoading,
    failureReason,
  } = useQuery({
    queryKey: ["protoPackage", fileUrl],
    queryFn: async () => {
      const content = await protoParserService.fetchProtoFile(fileUrl);
      return protoParserService.parseProtoFile(content);
    },
    enabled: !!fileUrl,
  });

  const handleFileLoad = useCallback(
    (newFileUrl: string) => {
      navigate("/");
      setFileUrl(newFileUrl);
    },
    [navigate]
  );

  const protoPackageContext = useMemo((): ProtoPackageContext => {
    return {
      protoPackage,
      isLoading,
      error: failureReason || undefined,
    };
  }, [protoPackage, isLoading, failureReason]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header p="md">
        <FileUrlInput fileUrl={fileUrl} onFileLoadClick={handleFileLoad} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavBar protoPackage={protoPackage} hasError={!!failureReason} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet context={protoPackageContext} />
      </AppShell.Main>
    </AppShell>
  );
};
