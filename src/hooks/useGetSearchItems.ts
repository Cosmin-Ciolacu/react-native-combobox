import { useEffect, useState } from "react";

export const useGetSearchItems = <T extends unknown>({
  items,
  search,
  searchField,
}: {
  items: T[];
  search: string;
  searchField?: string | number | symbol;
}): T[] => {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
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
  }, [search, items, searchField]);

  return filteredItems;
};
