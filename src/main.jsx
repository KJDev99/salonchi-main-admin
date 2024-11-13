import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/react-query";
import "./index.css";
import { Spinner } from "./components/spinner";
import "App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </QueryClientProvider>
);
