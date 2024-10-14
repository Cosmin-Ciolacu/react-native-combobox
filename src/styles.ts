import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  focus: {
    borderColor: "blue",
  },
  text: {
    width: "100%",
    height: "100%",
    marginLeft: 10,
  },
  dropdown: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    elevation: 5,
    width: "100%",
    // elevation: Platform.OS === "android" ? 50 : 0,
  },
  label: {
    marginBottom: 4,
    fontSize: 18,
  },
  error: {
    color: "red",
  },
  searchContainer: {
    padding: 10,
  },
  search: {
    outlineStyle: "none",
  },

  item: {
    padding: 10,
  },
  noSearchItem: {
    padding: 10,
  },
  flex1: {
    flex: 1,
  },
});
