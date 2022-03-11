export const typeToColor = (name: string) => {
  switch (name) {
    case "normal":
      return "#b6b8af";
    case "fighting":
      return "#cb5042";
    case "flying":
      return "#4998f7";
    case "poison":
      return "#541675";
    case "ground":
      return "#eabf3d";
    case "rock":
      return "#beb05c";
    case "bug":
      return "#a0b903";
    case "ghost":
      return "#001b5d";
    case "steel":
      return "#afabc1";
    case "fire":
      return "#ff0101";
    case "water":
      return "#0797f8";
    case "grass":
      return "#01b246";
    case "electric":
      return "#fffd00";
    case "psychic":
      return "#fd3a9a";
    case "ice":
      return "#afdbee";
    case "dragon":
      return "#7e64f3";
    case "dark":
      return "#973a00";
    case "fairy":
      return "#ffa0fe";
    default:
      return "#000";
  }
};

export const statResolver = (name: string) => {
  switch (name) {
    case "attack":
      return "atk";
    case "defense":
      return "def";
    case "special-attack":
      return "sp. atk";
    case "special-defense":
      return "sp. def";
    default:
      return name;
  }
};

export const arrayTypes: string[] = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];
