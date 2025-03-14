"use client";

import { useState, useEffect } from "react";

const useSearch = (query: string) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]); // Clear results when query is empty
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${query}`);
        const data = await res.json();
        console.log("Search API Response:", data);

        // Ensure results are properly updated
        setResults(data.products || []);  
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch results");
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchResults, 300); // Debounce API calls

    return () => clearTimeout(debounce);
  }, [query]);

  return { results, loading, error };
};

export default useSearch;
