import { useState } from "react";
import { Search, X } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

interface SearchFormProps
  extends Omit<React.ComponentProps<"form">, "onChange"> {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function AppSearchForm({
  onSearch,
  defaultValue = "",
  ...props
}: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onSearch?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      <SidebarGroup className="pt-4">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="size-4 opacity-70 hover:opacity-100" />
            </button>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
