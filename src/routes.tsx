import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App";
import { CharacterViewerPage } from "./components/CharacterViewerPage";
import { CharacterEditor } from "./components/edition/CharacterEditor";
import { CharacterHistoryPage } from "./components/CharacterHistoryPage";

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
          <CharacterViewerPage />
        )
      },
      {
        path: 'edit/:id',
        element: (
          <CharacterEditor />
        )
      },
      {
        path: 'history/:id',
        element: (
          <CharacterHistoryPage />
        )
      }
    ]
  }
]);
