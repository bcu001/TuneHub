import { useSearchParams } from "react-router-dom";

export const useSearchQuery = (value) => {
  const [searchParams] = useSearchParams();
  return searchParams.get(value) || "";
};
