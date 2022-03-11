import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { homeScreenProp } from "../utils/interfaces-types";

const Navbar = () => {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.navItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.navItemText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    width: "100%",
  },
  navItem: {
    flexGrow: 1,
    fontSize: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  navItemText: {
    fontSize: 19,
    color: "white",
  },
});

export default Navbar;
