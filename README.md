# Combobox Component

A customizable combobox component for React Native.
It works with both static and dynamic data, and it supports search functionality.
it works with both bared and managed workflow(Expo).
it is written in TypeScript.

## Features

- **Customizable**: You can customize the combobox with your own styles and render functions.
- **Searchable**: You can enable search functionality to filter items.
- **Dynamic Data**: You can use dynamic data to populate the combobox.
- **Keyboard Avoiding**: The combobox avoids the keyboard when active.
- **Common Configuration**: You can configure common properties like styles, focus, and blur events.
- **Dynamic Configuration**: You can configure dynamic properties like label and value fields.
- **Searchable Configuration**: You can configure searchable properties like search field, search placeholder, and search icon.
- **Searchable Callbacks**: You can use callbacks for non-existent items and custom rendering.
- **Searchable Items**: You can show a specific item when there is no search input.
- **Searchable No Results**: You can show a custom item when no search results are found.
- **Searchable Always Show**: You can always show a specific item when there is no search input.

## Demo

![Combobox Demo](https://github.com/Cosmin-Ciolacu/react-native-combobox/blob/main/demo.gif)

## Installation

```sh
npm i react-native-customisable-combobox
```

## Usage

```jsx
import React from "react";
import { View } from "react-native";
import { Combobox } from "react-native-customisable-combobox";

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

| **Property**             | **Type**                                                                  | **Description**                                                         | **Optional** | **Configuration**             |
| ------------------------ | ------------------------------------------------------------------------- |-------------------------------------------------------------------------| ------------ | ----------------------------- |
| `items`                  | `Array<T>` / `Array<string \| number>`                                    | The list of items displayed in the combobox.                            | No           | Common, Dynamic               |
| `mainContainerStyle`     | `ViewStyle`                                                               | Custom styles for the main combobox container.                          | Yes          | Common                        |
| `label`                  | `string`                                                                  | Label for the combobox.                                                 | Yes          | Common                        |
| `labelStyle`             | `TextStyle`                                                               | Custom styles for the label.                                            | Yes          | Common                        |
| `renderLabel`            | `() => React.ReactNode`                                                   | Custom function to render the label.                                    | Yes          | Common                        |
| `error`                  | `string`                                                                  | Error message for the combobox.                                         | Yes          | Common                        |
| `errorStyle`             | `TextStyle`                                                               | Custom styles for the error message.                                    | Yes          | Common                        |
| `renderError`            | `() => React.ReactNode`                                                   | Custom function to render the error message.                            | Yes          | Common                        |
| `style`                  | `ViewStyle`                                                               | Custom styles for the combobox container.                               | Yes          | Common                        |
| `itemStyle`              | `ViewStyle`                                                               | Custom styles for each item in the list.                                | Yes          | Common                        |
| `selectedStyle`          | `ViewStyle`                                                               | Custom styles for the selected item.                                    | Yes          | Common                        |
| `showBorder`             | `boolean`                                                                 | Whether to show border for the combobox.                                | Yes          | Common                        |
| `containerRadius`        | `number`                                                                  | Radius for the combobox container.                                      | Yes          | Common                        |
| `dropdownStyle`          | `ViewStyle`                                                               | Custom styles for the dropdown.                                         | Yes          | Common                        |
| `value`                  | `T`                                                                       | The currently selected value.                                           | No           | Common                        |
| `onFocus`                | `() => void`                                                              | Callback triggered when the combobox gains focus.                       | Yes          | Common                        |
| `onBlur`                 | `() => void`                                                              | Callback triggered when the combobox loses focus.                       | Yes          | Common                        |
| `labelField`             | `keyof T` / `never`                                                       | The key in the item object for the label value.                         | No / N/A     | Dynamic                       |
| `valueField`             | `keyof T` / `never`                                                       | The key in the item object for the value.                               | No / N/A     | Dynamic                       |
| `renderItem`             | `({ item, selected }: { item: T; selected: boolean }) => React.ReactNode` | Custom function to render each item.                                    | Yes          | Dynamic                       |
| `onChange`               | `(value: T \| string \| number) => void`                                  | Callback triggered when an item is selected.                            | No           | Dynamic                       |
| `searchable`             | `true / false`                                                            | Enables or disables search functionality.                               | No           | Searchable                    |
| `searchField`            | `keyof T` / `never`                                                       | The key in the item object for searching.                               | No / N/A     | Searchable                    |
| `searchPlaceholder`      | `string`                                                                  | Placeholder text for the search input.                                  | Yes          | Searchable (searchable: true) |
| `renderSearchIcon`       | `() => React.ReactNode`                                                   | Custom function to render a search icon.                                | Yes          | Searchable (searchable: true) |
| `showItemOnNoSearch`     | `boolean`                                                                 | Shows all items if there is no search input.                            | Yes          | Searchable (searchable: true) |
| `showAlwaysNoSearchItem` | `boolean`                                                                 | Always shows a specific item when there is no search input.             | Yes          | Searchable (searchable: true) |
| `renderNoSearchItem`     | `(value: string) => React.ReactNode`                                      | Custom function to render an item when no search results are found.     | Yes          | Searchable (searchable: true) |
| `onSelectedNotFoundItem` | `(value: string) => void`                                                 | Callback triggered when a non-existent item is selected after a search. | Yes          | Searchable (searchable: true) |
| `renderNotFoundItem`     | `(value: string) => React.ReactNode`                                      | Custom function to render a non-existent item.                          | Yes          | Searchable (searchable: true) |
| `debounceDelay`          | `number`                                                                  | Delay in milliseconds for the search input. Default is 300              | Yes          | Searchable (searchable: true) |