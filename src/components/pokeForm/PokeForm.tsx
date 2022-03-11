import { useEffect } from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as pokeApiService from "../../services/poke-api.service";
import { useState } from "react";
import { Picker } from "@react-native-community/picker";
import RowStat from "./RowStat";

interface IPokeForm {
  name: string;
  sprite: string;
  type_1: string;
  type_2: string;
  stats: string[];
  base_stats: string[];
  onChangeName: (name: string) => void;
  selectSprite: (event: GestureResponderEvent) => void;
  selectType_1: (type: string) => void;
  selectType_2: (type: string) => void;
  statHandler: (vale: string, stat: string) => void;
}

const PokeForm = ({
  name,
  sprite,
  selectSprite,
  type_1,
  type_2,
  selectType_1,
  selectType_2,
  stats,
  base_stats,
  statHandler,
  onChangeName,
}: IPokeForm) => {
  const [types, setTypes] = useState<{ name: string }[]>([]);

  const getTypes = async () => {
    const res = await pokeApiService.getTypes();
    if (!res) return;

    setTypes(res.data.results);
  };

  useEffect(() => {
    getTypes();

    return () => {
      setTypes([]);
    };
  }, [setTypes]);

  return (
    <>
      <View style={styles.cardContainer}>
        {sprite ? (
          <TouchableOpacity onPress={selectSprite}>
            <Image
              source={{
                uri: sprite,
              }}
              style={styles.pokeImg}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={selectSprite} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Pick an Image</Text>
          </TouchableOpacity>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre: </Text>
          <TextInput
            style={{ flex: 2, color: "#fff" }}
            maxLength={20}
            onChangeText={(e) => {
              onChangeName(e);
            }}
            value={name}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Type 1:</Text>
          <Picker
            selectedValue={type_1}
            style={{
              flex: 2,
              alignSelf: "center",
            }}
            onValueChange={(e) => {
              selectType_1(e.toString());
            }}
          >
            <Picker.Item label="Select a type" value="" />
            {types.map((e, i) => (
              <Picker.Item key={i} label={e.name} value={e.name} />
            ))}
          </Picker>
        </View>
        {type_1 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type 2:</Text>
            <Picker
              selectedValue={type_2}
              style={{
                flex: 2,
                alignSelf: "center",
              }}
              onValueChange={(e) => {
                selectType_2(e.toString());
              }}
            >
              <Picker.Item label="Select a type" value="" />
              {types.map((e, i) => (
                <Picker.Item key={i} label={e.name} value={e.name} />
              ))}
            </Picker>
          </View>
        )}
        {stats.map((e, i) => (
          <RowStat
            key={`#${i}`}
            stat={e}
            base_stat={base_stats[i]}
            statHandler={statHandler}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#222",
    flex: 1,
  },

  pokeImg: {
    width: 250,
    height: 250,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
    resizeMode: "contain",
  },

  selectButton: {
    padding: 7,
    marginTop: 5,
    backgroundColor: "#bbb",
  },
  selectButtonText: {
    color: "#444",
    fontSize: 15,
  },
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

export default PokeForm;
