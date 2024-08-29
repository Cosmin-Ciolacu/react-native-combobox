// import { Combobox } from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Combobox } from "react-native-customisable-combobox";

type ItemType = { id: number; name: string };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default function Index() {
  const [item, setItem] = useState<ItemType | null>(null);
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    async function fetchItems() {
      setItems([
        { id: 1, name: "John" },
        { id: 2, name: "Doe" },
        { id: 3, name: "Jane" },
      ]);
    }

    fetchItems();
  }, []);
  return (
    <View>
      <Combobox<ItemType>
        label="Select Item"
        style={{ width: "100%" }}
        showTextStyle={{ marginLeft: 4 }}
        items={items}
        labelField="name"
        valueField="id"
        searchField="name"
        value={items[0]}
        onChange={(value) => setItem(value)}
        searchable
        renderItem={({ item, selected }) => (
          <View
            style={{
              padding: 5,
              backgroundColor: selected ? "lightblue" : "white",
            }}
          >
            <Text>{item.name}</Text>
          </View>
        )}
        showItemOnNoSearch
        showAlwaysNoSearchItem
        noFoundItemText="No found"
        // noFoundItemTextStyle={{ color: "red" }}
        renderNoSearchItem={(value) => (
          <View
            style={{
              padding: 5,
              backgroundColor: "white",
            }}
          >
            <Text>{value}</Text>
          </View>
        )}
        useFlatList={false}
      />

      {/* <Combobox<string>
        label="select name"
        error="name is required"
        items={["John", "Doe", "Jane"]}
        value="John"
        onChange={(value) => console.log(value)}
        renderItem={({ item, selected }) => (
          <View
            style={{
              padding: 5,
              backgroundColor: selected ? "lightblue" : "white",
            }}
          >
            <Text>{item}</Text>
          </View>
        )}
        searchable={false}
      /> */}
    </View>
  );
}
