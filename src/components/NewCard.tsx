import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

type ICardProps = {
  name: string;
  sprite: string;
};

const NewCard = ({ name, sprite }: ICardProps) => {
  return (
    <>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          source={{
            uri: sprite,
          }}
          style={styles.pokeImg}
        />
        <Text style={{ textTransform: "capitalize", color: "white" }}>
          {name}
        </Text>
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
    backgroundColor: "black",
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

export default NewCard;
