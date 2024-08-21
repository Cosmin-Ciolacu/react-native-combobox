import React, { Key, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DownIcon from "../src/components/Icons/DownIcon";
import CloseIcon from "../src/components/Icons/CloseIcon";
import { ComboboxProps } from "./types";

export function Combobox<T extends unknown>({
  items,
  renderItem,
  labelField,
  valueField,
  searchField,
  style,
  itemStyle,
  selectedStyle,
  value,
  onChange,
  searchable,
  searchPlaceholder,
  onFocus,
  onBlur,
  keyboardAvoiding,
  showItemOnNoSearch,
  showAlwaysNoSearchItem = false,
  renderNoSearchItem,
  renderSearchIcon,
  onSelectedNotFoundItem,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<T | null>(value);
  const [focus, setFocus] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const containerRef = useRef<View>(null);

  const searchValue = useMemo(
    () =>
      selected
        ? typeof selected === "object" && labelField
          ? (selected[labelField] as string)
          : (selected as string)
        : search,
    [selected, search]
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownTop(height);
      });
    }
  }, [open]);

  const handleSelect = (item: T) => {
    setSelected(item);
    onChange(item as (string | number) & T);
    handleClose();
  };

  const handleSearch = (value: string) => {
    setOpen(true);
    setSelected(null);
    setSearch(value);
  };

  const handleFocus = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedNotFoundItem = () => {
    onSelectedNotFoundItem && onSelectedNotFoundItem(search);
    setSelected(search as unknown as T);
    handleClose();
  };

  const renderItems = () => {
    const filteredItems = search
      ? items.filter((item) => {
          if (typeof item === "object" && searchField) {
            return (
              item &&
              (item[searchField] as string).toLowerCase().includes(search)
            );
          } else {
            return item?.toString().includes(search);
          }
        })
      : items;

    if (filteredItems.length === 0) {
      return (
        <View style={styles.noSearchItem}>
          {!showItemOnNoSearch && !showAlwaysNoSearchItem ? (
            <Text>No items found</Text>
          ) : (
            <Pressable style={styles.item} onPress={handleSelectedNotFoundItem}>
              {renderNoSearchItem ? (
                renderNoSearchItem(search)
              ) : (
                <Text>{search}</Text>
              )}
            </Pressable>
          )}
        </View>
      );
    }

    return filteredItems.map((item, index) => {
      const key =
        item && typeof item === "object" && valueField
          ? (item[valueField] as Key)
          : index;
      return (
        <Pressable
          key={key}
          style={[styles.item, itemStyle, selected === item && selectedStyle]}
          onPress={() => handleSelect(item)}
        >
          {renderItem ? (
            renderItem({
              item,
              selected: selected === item,
            })
          ) : typeof item === "object" ? (
            <Text>
              {item &&
                labelField &&
                (item[labelField] as string | number | boolean)}
            </Text>
          ) : (
            <Text>{item as string | number}</Text>
          )}
        </Pressable>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={keyboardAvoiding}
    >
      <Pressable
        ref={containerRef}
        style={[style, styles.container]}
        onPress={handleOpen}
      >
        <Pressable
          style={[
            focus && styles.focus,
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {searchable ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              {renderSearchIcon && renderSearchIcon()}
              <TextInput
                style={styles.search}
                placeholder={searchPlaceholder}
                value={searchValue}
                onChangeText={handleSearch}
              />
            </View>
          ) : (
            <View style={styles.container}>
              <Text>{searchValue}</Text>
            </View>
          )}
        </Pressable>
        {open && (
          <View
            style={[
              styles.dropdown,
              {
                top: dropdownTop,
              },
            ]}
          >
            {renderItems()}
            {showAlwaysNoSearchItem && (
              <Pressable
                style={styles.item}
                onPress={handleSelectedNotFoundItem}
              >
                {renderNoSearchItem ? (
                  renderNoSearchItem(search)
                ) : (
                  <Text>{search}</Text>
                )}
              </Pressable>
            )}
          </View>
        )}
        {!open ? (
          <DownIcon size={18} />
        ) : (
          <Pressable onPress={handleClose}>
            <CloseIcon size={18} />
          </Pressable>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  focus: {
    borderColor: "blue",
  },
  dropdown: {
    // flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    zIndex: 100,
  },
  searchContainer: {
    padding: 10,
  },
  search: {
    width: "100%",
    height: "100%",
    outlineStyle: "none",
    marginLeft: 10,
  },

  item: {
    padding: 10,
  },
  noSearchItem: {
    padding: 10,
  },
});
