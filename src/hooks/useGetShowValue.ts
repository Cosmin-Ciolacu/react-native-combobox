import { useEffect, useState } from "react";

export const useGetShowValue = <T extends unknown>({
  selected,
  value,
  labelField,
  search,
  setSelected,
}: {
  selected: T | null | undefined;
  value: T | null | undefined;
  labelField?: string | number | symbol;
  search: string;
  setSelected: (value: T | null | undefined) => void;
}): string => {
  const [showValue, setShowValue] = useState<string>("");

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const showText = selected
      ? typeof selected === "object" && labelField
        ? (selected[labelField as keyof T] as string)
        : (selected as string)
      : search;

    setShowValue(showText);
  }, [selected, labelField, search]);

  return showValue;
};
