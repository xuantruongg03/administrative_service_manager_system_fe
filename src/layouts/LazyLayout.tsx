import { Suspense } from "react";
import Loading from "../pages/Loading";

function LazyLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export default LazyLayout;
