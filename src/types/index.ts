import { TextStyle, ViewStyle } from "react-native";

type CommonComboboxProps<T> = {
  items: Array<T>;
  useFlatList?: boolean;
  mainContainerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  noFoundItemText?: string;
  noFoundItemTextStyle?: TextStyle;
  showTextStyle?: TextStyle;
  renderLabel?: () => React.ReactNode;
  error?: string;
  errorStyle?: TextStyle;
  renderError?: () => React.ReactNode;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  selectedStyle?: ViewStyle;
  showBorder?: boolean;
  containerRadius?: number;
  dropdownStyle?: ViewStyle;
  value: T | null | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
};

type DynamicComboboxProps<T> =
  | {
      items: Array<T>;
      labelField: keyof T;
      valueField: keyof T;
      renderItem?: ({
        item,
        selected,
      }: {
        item: T;
        selected: boolean;
      }) => React.ReactNode;
      onChange: (value: T) => void;
    }
  | {
      items: Array<string | number>;
      labelField?: never;
      valueField?: never;
      renderItem: ({
        item,
        selected,
      }: {
        item: string | number;
        selected: boolean;
      }) => React.ReactNode;
      onChange: (value: string | number) => void;
    };

type SearchableComboboxProps<T> =
  | {
      searchable: true;
      searchField: keyof T;
      searchPlaceholder?: string;
      renderSearchIcon?: () => React.ReactNode;
      showItemOnNoSearch?: boolean;
      showAlwaysNoSearchItem?: boolean;
      renderNoSearchItem?: (value: string) => React.ReactNode;
      onSelectedNotFoundItem?: (value: string) => void;
      debounceDelay?: number;
    }
  | {
      searchable: false;
      searchField?: never;
      searchPlaceholder?: never;
      renderSearchIcon?: never;
      showItemOnNoSearch?: never;
      showAlwaysNoSearchItem?: never;
      renderNoSearchItem?: never;
      onSelectedNotFoundItem?: never;
      debounceDelay?: never;
    };

export type ComboboxProps<T> = CommonComboboxProps<T> &
  DynamicComboboxProps<T> &
  SearchableComboboxProps<T>;
