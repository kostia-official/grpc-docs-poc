import { Button, Flex, TextInput } from "@mantine/core";
import React, { useState } from "react";

export interface FileUrlInputProps {
  fileUrl: string;
  onFileLoadClick: (fileUrl: string) => void;
}

export const FileUrlInput: React.FC<FileUrlInputProps> = ({
  fileUrl: initialFileUrl,
  onFileLoadClick,
}) => {
  const [fileUrl, setFileUrl] = useState<string>(initialFileUrl);

  return (
    <Flex direction="row" align="center" gap="xs" h="100%">
      <TextInput
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        w="300px"
        placeholder="Proto file url"
      />

      <Button
        disabled={!fileUrl}
        onClick={() => {
          if (!fileUrl) return;
          onFileLoadClick(fileUrl);
        }}
      >
        Load
      </Button>
    </Flex>
  );
};
