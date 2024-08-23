import React, { Key, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import DownIcon from "../src/components/Icons/DownIcon";
import CloseIcon from "../src/components/Icons/CloseIcon";
import { ComboboxProps } from "./types";
import { styles } from "./styles";
import { useDebounce } from "./hooks/useDebounce";

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
  label,
  labelStyle,
  renderLabel,
  error,
  errorStyle,
  renderError,
  mainContainerStyle,
  debounceDelay = 300,
  noFoundItemText,
  noFoundItemTextStyle,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, debounceDelay);
  const [selected, setSelected] = useState<T | null | undefined>(value);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
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

  useEffect(() => {
    const foundItems = debouncedSearch
      ? items.filter((item) => {
          if (typeof item === "object" && searchField) {
            return (
              item &&
              (item[searchField] as string)
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            );
          } else {
            return item?.toString().includes(debouncedSearch.toLowerCase());
          }
        })
      : items;

    setFilteredItems(foundItems);
  }, [debouncedSearch, items, searchField]);

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
    onSelectedNotFoundItem && onSelectedNotFoundItem(debouncedSearch);
    setSelected(debouncedSearch as unknown as T);
    handleClose();
  };

  const renderDropdownItem = ({
    item,
    key,
  }: {
    item: T;
    key: number | string;
  }) => {
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
  };

  return (
    <View
      style={[
        styles.mainContainer,
        mainContainerStyle,
        { position: "relative" },
        open && Platform.OS === "ios" ? { zIndex: 1000 } : {},
      ]}
    >
      {renderLabel
        ? renderLabel()
        : label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <View
          style={[
            focus && styles.focus,
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          {searchable ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              {renderSearchIcon && renderSearchIcon()}
              <TextInput
                style={[styles.text, styles.search]}
                placeholder={searchPlaceholder}
                value={searchValue}
                onChangeText={handleSearch}
              />
            </View>
          ) : (
            <View style={styles.text}>
              <Text>{searchValue}</Text>
            </View>
          )}
        </View>
        {!open ? (
          <DownIcon size={18} />
        ) : (
          <Pressable onPress={handleClose}>
            <CloseIcon size={18} />
          </Pressable>
        )}
      </Pressable>
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {renderError ? renderError() : error}
        </Text>
      )}
      {open && (
        <View
          style={[
            dropdownStyle,
            styles.dropdown,
            {
              marginTop: dropdownTop + 30,
            },
          ]}
        >
          <FlatList
            data={filteredItems}
            renderItem={({ item, index }) =>
              renderDropdownItem({ item, key: index })
            }
            keyExtractor={(item, index) =>
              item && typeof item === "object" && valueField
                ? (item[valueField] as Key).toString()
                : index.toString()
            }
            style={{ maxHeight: 200 }}
          />
          {filteredItems.length === 0 && !showItemOnNoSearch && (
            <Pressable style={styles.item}>
              <Text style={[noFoundItemTextStyle]}>
                {noFoundItemText ? noFoundItemText : "No items found"}
              </Text>
            </Pressable>
          )}
          {(showAlwaysNoSearchItem ||
            (showItemOnNoSearch && filteredItems.length === 0)) && (
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
