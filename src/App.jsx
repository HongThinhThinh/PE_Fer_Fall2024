import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Contact from "./page/Contact";
import Layout from "./components/layOut";
import Detail from "./page/Detail";
import Add from "./page/Add";
import Update from "./page/Update";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/dungltSE170484",
        element: <Dashboard />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
