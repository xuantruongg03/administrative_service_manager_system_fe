import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import { CONSTANTS } from "../utils/constants";
import LazyLayout from "../layouts/LazyLayout";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
const App = lazy(() => import("../App.js"));
const Map = lazy(() => import("../pages/Map.js"));

const routes = createBrowserRouter([
    {
        path: CONSTANTS.PATH.ROOT_PATH,
        element: <Auth />,
        children: [
            {
                path: "",
                element: (
                    <LazyLayout>
                        <RootLayout>
                            <App />
                        </RootLayout>
                    </LazyLayout>
                ),
            },
            {
                path: "/map",
                element: (
                    <LazyLayout>
                        <RootLayout>
                            <Map />
                        </RootLayout>
                    </LazyLayout>
                ),
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default routes;
