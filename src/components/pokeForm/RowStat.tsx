import { View, Text, TextInput, StyleSheet } from "react-native";
import { statResolver } from "../../utils/helpers";

interface IRow {
  stat: string;
  base_stat: string;
  statHandler: (value: string, stat: string) => void;
}
const RowStat = ({ stat, statHandler, base_stat }: IRow) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{statResolver(stat)}:</Text>
      <TextInput
        style={{ flex: 2, color: "#fff" }}
        keyboardType="numeric"
        maxLength={3}
        onChangeText={(e) => {
          statHandler(e, stat);
        }}
        value={base_stat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  label: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: "#fff",
  },
});

export default RowStat;
