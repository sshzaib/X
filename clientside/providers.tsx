"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XLayout } from "./components/XLayout";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId="287221084975-s2uu87brisf5aul8duondpsso1bc3lr8.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <XLayout>{children}</XLayout>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
