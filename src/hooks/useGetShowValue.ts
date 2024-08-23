import { useEffect, useState } from "react";

export const useGetShowValue = <T extends unknown>({
  selected,
  labelField,
  search,
}: {
  selected: T | null | undefined;
  labelField?: string | number | symbol;
  search: string;
}): string => {
  const [showValue, setShowValue] = useState<string>("");

  useEffect(() => {
    const value = selected
      ? typeof selected === "object" && labelField
        ? (selected[labelField as keyof T] as string)
        : (selected as string)
      : search;
    setShowValue(value);
  }, [selected, labelField, search]);

  return showValue;
};
