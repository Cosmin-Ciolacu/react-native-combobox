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
import { styles } from "./styles";

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
  searchable = false,
  searchPlaceholder,
  onFocus,
  onBlur,
  showItemOnNoSearch,
  showAlwaysNoSearchItem = false,
  renderNoSearchItem,
  renderSearchIcon,
  onSelectedNotFoundItem,
  containerRadius,
  showBorder,
  dropdownStyle,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<T | null | undefined>(value);
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
    <View style={open && Platform.OS === "ios" ? { zIndex: 999 } : {}}>
      <Pressable
        ref={containerRef}
        style={[
          style,
          styles.container,
          showBorder && styles.border,
          {
            borderRadius: containerRadius || 5,
          },
        ]}
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
        {!open ? (
          <DownIcon size={18} />
        ) : (
          <Pressable onPress={handleClose}>
            <CloseIcon size={18} />
          </Pressable>
        )}
      </Pressable>
      {open && (
        <View
          style={[
            dropdownStyle,
            styles.dropdown,
            {
              marginTop: dropdownTop + 10,
            },
          ]}
        >
          {renderItems()}
          {showAlwaysNoSearchItem && (
            <Pressable style={styles.item} onPress={handleSelectedNotFoundItem}>
              {renderNoSearchItem ? (
                renderNoSearchItem(search)
              ) : (
                <Text>{search}</Text>
              )}
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
