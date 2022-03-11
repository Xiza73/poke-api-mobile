import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar></Navbar>
      <View style={styles.container}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222f3e",
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
});
