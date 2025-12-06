import Loader from "@/components/loader/input";
import { lazy, Suspense, type ComponentType } from "react";

export function appLazy(importFunc: () => Promise<{ default: ComponentType<any> }>) {
    const LazyComponent = lazy(importFunc);
    
    return (props: any) => (
        <Suspense fallback={<Loader />}>
            <LazyComponent {...props} />
        </Suspense>
    );
}