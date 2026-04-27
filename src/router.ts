import { useEffect, useState } from "react";
import type { RouteKey } from "@/types";

const ROUTE_PATHS: Record<RouteKey, string> = {
  dashboard: "/",
  "line-oa": "/line-oa",
  contacts: "/contacts",
  segments: "/segments",
};

function pathToRoute(pathname: string): RouteKey {
  if (pathname.startsWith("/line-oa")) return "line-oa";
  if (pathname.startsWith("/contacts")) return "contacts";
  if (pathname.startsWith("/segments")) return "segments";
  return "dashboard";
}

export function usePrototypeRouter() {
  const [route, setRoute] = useState<RouteKey>(() => pathToRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setRoute(pathToRoute(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextRoute: RouteKey) => {
    const nextPath = ROUTE_PATHS[nextRoute];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setRoute(nextRoute);
  };

  return { route, navigate };
}
