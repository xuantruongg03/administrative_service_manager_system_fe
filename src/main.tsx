import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import routes from "./routes/index";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <RouterProvider router={routes} />
      </PrimeReactProvider>
    </QueryClientProvider>
  </Provider>,
);
