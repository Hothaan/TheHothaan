import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => navigate(path);

  return { handleNavigation };
}
