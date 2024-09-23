import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useDebouncing = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(input);
  const location = useLocation();
  const isSearching = input !== "";
  useEffect(() => setInput(""), [location.pathname]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(input);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
  return { input, setInput, query, isSearching };
};
