import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import PokeForm from "../components/pokeForm/PokeForm";
import { arrayTypes } from "../utils/helpers";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import NewCard from "../components/NewCard";

type Form = {
  order: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

const PokeRegister = () => {
  const [form, setForm] = useState<Form>(initialForm);
  const [pokes, setPokes] = useState<Form[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPokes = async () => {
    const data = await AsyncStorage.getItem("Pokes");
    if (!data) return;
    setPokes(JSON.parse(data));
  };

  const registerPoke = async () => {
    try {
      if (!form.sprites.front_default || !form.types[0]?.type.name)
        return alert("Please complete all the form");
      if (!pokes) {
        await AsyncStorage.setItem("Pokes", JSON.stringify([form]));
        return alert("First pokemon added!");
      }

      await AsyncStorage.setItem("Pokes", JSON.stringify([...pokes, form]));
      loadPokes();
      return alert("Register complete!");
    } catch (err) {}
  };

  const openImagePicker = async () => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissions.granted)
      return alert("Los permisos para acceder a la cámara son requeridos.");

    const imgPicked = await ImagePicker.launchImageLibraryAsync();

    if (imgPicked.cancelled) return;

    setForm({
      ...form,
      sprites: {
        front_default: imgPicked.uri,
      },
    });
  };

  const selectType_1 = (e: string) => {
    if (!e) return;
    setForm((state) => ({
      ...state,
      types: [
        //...state.types,
        {
          type: {
            name: e,
          },
        },
      ],
    }));
  };

  const selectType_2 = (e: string) => {
    if (!e) return;
    if (e === form.types[0].type.name) return;
    if (form.types.length < 2)
      setForm((state) => ({
        ...state,
        types: [
          ...state.types,
          {
            type: {
              name: e,
            },
          },
        ],
      }));
    else
      setForm((state) => ({
        ...state,
        types: [
          state.types[0],
          {
            type: {
              name: e,
            },
          },
        ],
      }));
  };

  const statHandler = async (e: string, stat: string) => {
    let attr = parseInt(e);
    if (isNaN(attr)) attr = 0;
    setForm((state) => ({
      ...state,
      stats: [
        ...state.stats.filter((e) => {
          return e.stat.name !== stat;
        }),
        {
          base_stat: attr,
          stat: {
            name: stat,
          },
        },
      ],
    }));
  };

  useEffect(() => {
    loadPokes();
    return () => {
      setForm(initialForm);
      setPokes([]);
      setModalVisible(false);
    };
  }, [setForm, setPokes]);

  return (
    <>
      <PokeForm
        name={form.name}
        onChangeName={(name) =>
          setForm((s) => ({
            ...s,
            name,
          }))
        }
        sprite={form.sprites.front_default}
        type_1={form.types[0]?.type.name}
        type_2={form.types[1]?.type.name}
        stats={arrayTypes}
        base_stats={arrayTypes.map(
          (e) =>
            form.stats.find((s) => s.stat.name === e)?.base_stat.toString()!
        )}
        selectSprite={openImagePicker}
        selectType_1={selectType_1}
        selectType_2={selectType_2}
        statHandler={statHandler}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={registerPoke}
          style={{
            padding: 7,
            marginTop: 5,
            marginBottom: 7,
            alignSelf: "center",
            backgroundColor: "#111",
            borderRadius: 8,
            width: 90,
          }}
        >
          <Text
            style={{
              color: "#ddd",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            padding: 7,
            marginTop: 5,
            marginBottom: 7,
            alignSelf: "center",
            backgroundColor: "#111",
            borderRadius: 8,
            width: 90,
          }}
        >
          <Text
            style={{
              color: "#ddd",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Pokes
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Pressable
            style={{
              borderRadius: 20,
              padding: 10,
              elevation: 2,
              backgroundColor: "#111",
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Hide
            </Text>
          </Pressable>
          <View
            style={{
              padding: 5,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              borderRadius: 20,
              backgroundColor: "blue",
            }}
          >
            {pokes.length ? (
              pokes.map((e, i) => (
                <NewCard
                  key={`#${i}`}
                  name={e.name}
                  sprite={e.sprites.front_default}
                />
              ))
            ) : (
              <Text>No Pokes</Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const initialForm: Form = {
  order: 0,
  name: "",
  sprites: {
    front_default: "",
  },
  stats: [
    {
      base_stat: 0,
      stat: {
        name: "hp",
      },
    },
    {
      base_stat: 0,
      stat: {
        name: "attack",
      },
    },
    {
      base_stat: 0,
      stat: {
        name: "defense",
      },
    },
    {
      base_stat: 0,
      stat: {
        name: "special-attack",
      },
    },
    {
      base_stat: 0,
      stat: {
        name: "special-defense",
      },
    },
    {
      base_stat: 0,
      stat: {
        name: "speed",
      },
    },
  ],
  types: [],
};

export default PokeRegister;
