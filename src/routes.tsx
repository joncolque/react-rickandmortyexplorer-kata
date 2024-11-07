import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App";
import { CharacterViewer } from "./components/CharacterViewer";
import { CharacterEditor } from "./components/edition/CharacterEditor";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <App />
        )
      },
      {
        path: ':id',
        element: (
          <CharacterViewer />
        )
      },
      {
        path: 'edit/:id',
        element: (
          <CharacterEditor />
        )
      }
    ]
  }
]);
