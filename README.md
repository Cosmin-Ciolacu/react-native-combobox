# Combobox Component

A customizable combobox component for React Native.

## Installation

To use this component, you need to have `react`, `react-native`, and `typescript` installed in your project.

```sh
npm install react react-native typescript
```

## Usage

```jsx
import React from "react";
import { View } from "react-native";
import { Combobox } from "./path/to/Combobox";

const items = [
  { label: "Item 1", value: "item1" },
  { label: "Item 2", value: "item2" },
  // Add more items here
];

const App = () => {
  const [selectedItem, setSelectedItem] = React.useState(items[0]);

  return (
    <View>
      <Combobox
        items={items}
        labelField="label"
        valueField="value"
        searchField="label"
        value={selectedItem}
        onChange={setSelectedItem}
        searchable
        searchPlaceholder="Search items..."
      />
    </View>
  );
};

export default App;
```

## Props

| **Property**             | **Type**                                                                  | **Description**                                                         | **Optional**                                 | **Configuration**                            |
| ------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- | --------------- | ------- |
| `items`                  | `Array<T>` / `Array<string                                                | number>`                                                                | The list of items displayed in the combobox. | No                                           | Common, Dynamic |
| `style`                  | `ViewStyle`                                                               | Custom styles for the combobox container.                               | Yes                                          | Common                                       |
| `itemStyle`              | `ViewStyle`                                                               | Custom styles for each item in the list.                                | Yes                                          | Common                                       |
| `selectedStyle`          | `ViewStyle`                                                               | Custom styles for the selected item.                                    | Yes                                          | Common                                       |
| `value`                  | `T`                                                                       | The currently selected value.                                           | No                                           | Common                                       |
| `onFocus`                | `() => void`                                                              | Callback triggered when the combobox gains focus.                       | Yes                                          | Common                                       |
| `onBlur`                 | `() => void`                                                              | Callback triggered when the combobox loses focus.                       | Yes                                          | Common                                       |
| `keyboardAvoiding`       | `boolean`                                                                 | If true, the combobox avoids the keyboard when active.                  | Yes                                          | Common                                       |
| `labelField`             | `keyof T` / `never`                                                       | The key in the item object for the label value.                         | No / N/A                                     | Dynamic                                      |
| `valueField`             | `keyof T` / `never`                                                       | The key in the item object for the value.                               | No / N/A                                     | Dynamic                                      |
| `renderItem`             | `({ item, selected }: { item: T; selected: boolean }) => React.ReactNode` | Custom function to render each item.                                    | Yes                                          | Dynamic                                      |
| `onChange`               | `(value: T                                                                | string                                                                  | number) => void`                             | Callback triggered when an item is selected. | No              | Dynamic |
| `searchable`             | `true / false`                                                            | Enables or disables search functionality.                               | No                                           | Searchable                                   |
| `searchField`            | `keyof T` / `never`                                                       | The key in the item object for searching.                               | No / N/A                                     | Searchable                                   |
| `searchPlaceholder`      | `string`                                                                  | Placeholder text for the search input.                                  | Yes                                          | Searchable (searchable: true)                |
| `renderSearchIcon`       | `() => React.ReactNode`                                                   | Custom function to render a search icon.                                | Yes                                          | Searchable (searchable: true)                |
| `showItemOnNoSearch`     | `boolean`                                                                 | Shows all items if there is no search input.                            | Yes                                          | Searchable (searchable: true)                |
| `showAlwaysNoSearchItem` | `boolean`                                                                 | Always shows a specific item when there is no search input.             | Yes                                          | Searchable (searchable: true)                |
| `renderNoSearchItem`     | `(value: string) => React.ReactNode`                                      | Custom function to render an item when no search results are found.     | Yes                                          | Searchable (searchable: true)                |
| `onSelectedNotFoundItem` | `(value: string) => void`                                                 | Callback triggered when a non-existent item is selected after a search. | Yes                                          | Searchable (searchable: true)                |
