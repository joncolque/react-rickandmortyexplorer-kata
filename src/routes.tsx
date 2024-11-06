import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App";
import Character from "./components/CharacterComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        )
      },
      {
        path: ':id',
        element: (
          <Character id={''} image={""} name={""} species={""} />
        )
      }
    ]
  }
]);
