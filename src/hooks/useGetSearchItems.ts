import { useEffect, useState } from "react";

export const useGetSearchItems = <T extends unknown>({
  items,
  search,
  searchField,
  onSearchCallback,
}: {
  items: T[];
  search: string;
  searchField?: string | number | symbol;
  onSearchCallback?: (value: string) => T[] | Promise<T[]>;
}): T[] => {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    if (search && search.length > 3) {
      if (onSearchCallback) {
        const customFilteredItems = onSearchCallback(search);
        if (customFilteredItems instanceof Promise) {
          customFilteredItems.then(setFilteredItems);
        } else {
          setFilteredItems(customFilteredItems);
        }
        return;
      }

      const foundItems = items.filter((item) => {
        if (typeof item === "object" && searchField) {
          const fieldValue = item?.[searchField as keyof T];
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(search.toLowerCase());
          }
          return false;
        } else {
          return (
            typeof item === "string" &&
            item.toLowerCase().includes(search.toLowerCase())
          );
        }
      });

      setFilteredItems(foundItems);
    } else {
      setFilteredItems(items);
    }
  }, [search, items, searchField]);

  return filteredItems;
};
