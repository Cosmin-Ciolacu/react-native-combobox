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

      const foundItems = search
        ? items.filter((item) => {
            if (typeof item === "object" && searchField) {
              return (
                item &&
                (item[searchField as keyof T] as string)
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            } else {
              return item?.toString().includes(search.toLowerCase());
            }
          })
        : items;

      setFilteredItems(foundItems);
    }
  }, [search, items, searchField]);

  return filteredItems;
};
