import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect } from "react";
import * as pokeApiService from "../services/poke-api.service";
import { Pokemon } from "../utils/interfaces-types";
import { useState } from "react";
import { usePokeState } from "../context/PokeContext";

type ICardProps = {
  name: string;
  detailsHandler: (event: GestureResponderEvent) => void;
};

const BasicCard = ({ name, detailsHandler }: ICardProps) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { loading, setLoading, error, setError } = usePokeState();

  const uri = "https://picsum.photos/200/200";

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
  }, [setPokemon, name]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Not found Pokémon</Text>;
  return (
    <>
      <TouchableOpacity style={styles.cardContainer} onPress={detailsHandler}>
        <Image
          source={{
            uri: pokemon?.sprites.front_default
              ? pokemon?.sprites.front_default
              : uri,
          }}
          style={styles.pokeImg}
        />
        <Text style={{ textTransform: "capitalize" }}>{name}</Text>
        <TouchableOpacity onPress={detailsHandler} style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: 150,
    height: 230,
    borderRadius: 8,
    marginHorizontal: 7,
    marginVertical: 5,
    backgroundColor: "white",
  },

  pokeImg: {
    width: 130,
    height: 130,
    borderRadius: 8,
    backgroundColor: "#333",
    borderWidth: 0.1,
    resizeMode: "contain",
  },

  detailsButton: {
    padding: 7,
    marginTop: 5,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  detailsButtonText: {
    color: "#ddd",
    fontSize: 12,
  },
});

export default BasicCard;
