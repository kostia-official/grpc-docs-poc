import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import { GrpcDocs } from "./containers/GrpcDocs";
import { ServiceContent } from "./containers/GrpcDocs/components/ServiceContent";
import { PackageContent } from "./containers/GrpcDocs/components/PackageContent";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{ defaultRadius: "md" }}>
          <Routes>
            <Route path="/" element={<GrpcDocs />}>
              <Route path="/" element={<PackageContent />} />
              <Route path="/service/:name" element={<ServiceContent />} />
            </Route>
          </Routes>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
