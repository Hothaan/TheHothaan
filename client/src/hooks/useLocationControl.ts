import { useLocation } from "react-router-dom";

export default function useLocationControl() {
  const location = useLocation();

  const currentLocation = location.pathname;

  const includeLocation = (path: string) => location.pathname.includes(path);

  const checkLocation = (pathArr: string[]) =>
    pathArr.some((path: string) => location.pathname === path);

  return { includeLocation, checkLocation };
}
