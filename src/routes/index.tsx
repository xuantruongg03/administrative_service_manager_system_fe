import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LazyLayout from "../layouts/LazyLayout";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
const App = lazy(() => import("../App"));
const Documents = lazy(() => import("../pages/Documents"));
const Map = lazy(() => import("../pages/Map"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <LazyLayout>
                        <App />
                    </LazyLayout>
                ),
            },
            {
                path: "attachments-documents",
                element: (
                    <LazyLayout>
                        <Documents />
                    </LazyLayout>
                ),
            },
            {
                path: "map",
                element: (
                    <LazyLayout>
                        <Map />
                    </LazyLayout>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default routes;
