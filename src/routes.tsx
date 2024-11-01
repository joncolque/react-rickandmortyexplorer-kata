import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App";
import Character from "./pages/CharacterComponent";

export const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
            <App/>
            )
        },
        {
          path: ':id',
          element: (
            <Character id={''} image={""} name={""} species={""}/>
          )
        }
      ]
    }
  ]);
