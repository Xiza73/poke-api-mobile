import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Pokemon } from "../utils/interfaces-types";
import * as pokeApiService from "../services/poke-api.service";
import { usePokeState } from "../context/PokeContext";
import { statResolver, typeToColor } from "../utils/helpers";

type DetailProps = {
  route: {
    params: {
      name: string;
    };
  };
};
const BasicDetail = ({
  route: {
    params: { name },
  },
}: DetailProps) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { loading, setLoading, error, setError } = usePokeState();

  const loadPoke = async () => {
    setLoading(true);
    const res = await pokeApiService.getPoke(name.toLowerCase());
    setLoading(false);
    if (!res) {
      setError(true);
      return;
    }

    setError(false);
    setPokemon(res.data);
  };

  useEffect(() => {
    loadPoke();
    return () => {
      setPokemon(null);
    };
  }, [setPokemon]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Not found Pokémon</Text>;
  return (
    <>
      <View style={styles.cardContainer}>
        <Text
          style={{ textTransform: "capitalize", fontSize: 30, color: "#fff" }}
        >
          {name} #{pokemon?.order}
        </Text>
        <Image
          source={{
            uri: pokemon?.sprites.front_default,
          }}
          style={styles.pokeImg}
        />
        <View style={styles.infoRow}>
          {pokemon?.types.map((e) => (
            <View
              key={`#${e.type.name}`}
              style={{
                padding: 7,
                backgroundColor: `${typeToColor(e.type.name)}`,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: `#fff`,
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                {e.type.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.infoRow}>
          {pokemon?.stats.map((e, i) => {
            if (i < 3) {
              return (
                <View
                  key={`#${e.base_stat}${e.stat.name}`}
                  style={styles.typeContainer}
                >
                  <Text style={styles.typeStat}>
                    {statResolver(e.stat.name.toLowerCase())}
                  </Text>
                  <Text style={styles.typeBase}>: {e.base_stat}</Text>
                </View>
              );
            }
          })}
        </View>
        <View style={styles.infoRow}>
          {pokemon?.stats.map((e, i) => {
            if (i > 2) {
              return (
                <View
                  key={`#${e.base_stat}${e.stat.name}`}
                  style={styles.typeContainer}
                >
                  <Text style={styles.typeStat}>
                    {statResolver(e.stat.name.toLowerCase())}
                  </Text>
                  <Text style={styles.typeBase}>: {e.base_stat}</Text>
                </View>
              );
            }
          })}
        </View>
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
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
    resizeMode: "contain",
  },

  infoRow: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  typeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  typeStat: {
    color: `#fff`,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  typeBase: {
    color: `#fff`,
    fontSize: 18,
  },
});

export default BasicDetail;
