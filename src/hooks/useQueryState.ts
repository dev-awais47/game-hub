import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "qs";

const useQueryState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const setQuery = useCallback(
    (query: string, value: string) => {
      const existingQueries = QueryString.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      const queryString = QueryString.stringify(
        { ...existingQueries, [query]: value },
        { skipNulls: true }
      );

      navigate(`${location.pathname}?${queryString}`, { replace: true });
    },
    [navigate, location]
  );

  const getQuery = useCallback(
    (query: string) => {
      const parsedQuery = QueryString.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      return parsedQuery[query] as string | undefined;
    },
    [location]
  );

  return { setQuery, getQuery };
};

export default useQueryState;
