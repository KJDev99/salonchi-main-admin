import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { Layout } from "@/layout";
import { HocPrivate } from "./hoc";
import ErrorBoundary from "@/pages/error";

export const PrivateRouter = () => {
  return (
    <ErrorBoundary>
      <HocPrivate>
        <Suspense fallback={<Spinner />}>
          <Layout />
        </Suspense>
      </HocPrivate>
    </ErrorBoundary>
  );
};
