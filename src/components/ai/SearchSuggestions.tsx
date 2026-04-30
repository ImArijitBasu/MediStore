"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  name: string;
  brandName: string;
  genericName?: string;
  category?: { name: string };
}

interface SearchSuggestionsProps {
  apiUrl?: string;
}

export default function SearchSuggestions({ apiUrl }: SearchSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || "";

  const searchMedicines = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/medicines?search=${encodeURIComponent(searchTerm)}&limit=6`);
      const data = await res.json();
      if (data.success && data.data) {
        setResults(data.data);
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchMedicines(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchMedicines]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800 font-semibold rounded-sm px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search medicines, brands, categories..."
          className="w-full pl-11 pr-10 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b">
            <p className="text-xs text-muted-foreground">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
          </div>
          {results.map((medicine) => (
            <Link
              key={medicine.id}
              href={`/medicines/${medicine.id}`}
              onClick={() => { setIsOpen(false); setQuery(""); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b last:border-b-0"
            >
              <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                <span className="text-sm">💊</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {highlightMatch(medicine.name, query)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {medicine.brandName}
                  {medicine.category?.name && ` · ${medicine.category.name}`}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/medicines?search=${encodeURIComponent(query)}`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-center text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-muted transition-colors"
          >
            View all results for &ldquo;{query}&rdquo;
          </Link>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-card border rounded-xl shadow-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No medicines found for &ldquo;{query}&rdquo;
          </p>
          <Link
            href="/medicines"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            Browse all medicines
          </Link>
        </div>
      )}
    </div>
  );
}
