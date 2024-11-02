import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LazyLayout from "../layouts/LazyLayout";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import { CONSTANTS } from "../utils/constants";
const Help = lazy(() => import("../pages/Help"));
const App = lazy(() => import("../App"));
const Business = lazy(() => import("../pages/Business"));
const BusinessLicense = lazy(() => import("../pages/BusinessLicense"));
const Map = lazy(() => import("../pages/Map"));
const EditBusiness = lazy(() => import("../pages/EditBusiness"));

const routes = createBrowserRouter([
    {
        path: CONSTANTS.PATH.ROOT_PATH,
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
                path: CONSTANTS.PATH.BUSINESS_PATH,
                element: (
                    <LazyLayout>
                        <Business />
                    </LazyLayout>
                ),
            },
            {
                path: CONSTANTS.PATH.BUSINESS_LICENSE_PATH,
                element: (
                    <LazyLayout>
                        <BusinessLicense />
                    </LazyLayout>
                ),
            },
            {
                path: CONSTANTS.PATH.MAP_PATH,
                element: (
                    <LazyLayout>
                        <Map />
                    </LazyLayout>
                ),
            },
            {
                path: CONSTANTS.PATH.EDIT_BUSINESS_PATH + ":id",
                element: (
                    <LazyLayout>
                        <EditBusiness />
                    </LazyLayout>
                ),
            },
            {
                path: CONSTANTS.PATH.HELP_PATH,
                element: (
                    <LazyLayout>
                        <Help />
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
