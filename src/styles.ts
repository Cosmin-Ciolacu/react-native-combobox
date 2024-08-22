import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  focus: {
    borderColor: "blue",
  },
  dropdown: {
    // flex: 1,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    // elevation: 50,
    position: "absolute",
    zIndex: 999,
    elevation: Platform.OS === "android" ? 50 : 0,
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
