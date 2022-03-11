import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as pokeApiService from "../services/poke-api.service";
import { homeScreenProp, ResultPokes } from "../utils/interfaces-types";
import Layout from "../components/Layout";
import BasicCard from "../components/BasicCard";
import { useNavigation } from "@react-navigation/native";
import { usePokeState } from "../context/PokeContext";

const Home = () => {
  const [resultsPoke, setResultsPoke] = useState<ResultPokes[]>([]);
  const [name, setName] = useState<string>("");
  const [preName, setPreName] = useState<string>("");
  const [max, setMax] = useState<number>(10);
  const { loading, setLoading, error, setError } = usePokeState();

  const navigation = useNavigation<homeScreenProp>();

  const loadPokes = async () => {
    setLoading(true);
    const res = await pokeApiService.getPokes(10, 0);
    if (!res) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(false);
    setError(false);
    setResultsPoke((rp) => [...rp, ...res.data.results]);
  };

  const loadMoreData = async () => {
    const res = await pokeApiService.getPokes(10, max);
    if (!res) return;

    setMax(max + 10);
    setResultsPoke((rp) => [...rp, ...res.data.results]);
  };

  const detailsPoke = (poke: string) => {
    navigation.navigate("Basic Details", {
      name: poke,
    });
  };

  useEffect(() => {
    loadPokes();
    return () => {
      setPreName("");
      setResultsPoke([]);
      setMax(10);
    };
  }, [setResultsPoke, setName, setMax]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Not found Pokémon</Text>;
  return (
    <Layout>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Look for a Pokémon!
        </Text>
        <TextInput
          style={styles.browser}
          onChangeText={setPreName}
          onKeyPress={(e) => {
            if (e.nativeEvent.key == "Enter") {
              setName(preName);
            }
          }}
          onSubmitEditing={() => {
            setName(preName);
          }}
          value={preName}
        />
        {name ? (
          <View style={styles.container}>
            <BasicCard
              name={name}
              detailsHandler={() => {
                detailsPoke(name);
              }}
            />
          </View>
        ) : (
          <>
            <Text style={{ alignSelf: "center", color: "#fff" }}>
              {resultsPoke.length} Results
            </Text>
            <FlatList
              key={"#"}
              keyExtractor={(_, index) => `#${index.toString()}`}
              data={resultsPoke}
              contentContainerStyle={styles.container}
              numColumns={resultsPoke ? 2 : 2}
              renderItem={({ item }) => (
                <BasicCard
                  name={item.name}
                  detailsHandler={() => {
                    detailsPoke(item.name);
                  }}
                />
              )}
            />
            <TouchableOpacity
              onPress={loadMoreData}
              style={{
                padding: 7,
                marginTop: 5,
                alignSelf: "center",
                backgroundColor: "#111",
                borderRadius: 8,
                width: 90,
              }}
            >
              <Text
                style={{
                  color: "#ddd",
                  fontSize: 12,
                }}
              >
                Load more...
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 20,
  },
  browser: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ccc",
  },
});

export default Home;
