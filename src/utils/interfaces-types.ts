import { StackNavigationProp } from "@react-navigation/stack";

export interface DataPokes {
  results: ResultPokes[];
}

export type ResultPokes = {
  name: string;
  url: string;
};

export interface DataPoke {
  data: Pokemon;
}

export type Pokemon = {
  id: number;
  order: number;
  name: string;
  moves: {
    move: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
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

//roots
export type RootStackParamList = {
  Register: undefined;
  Home: undefined;
  "Basic Details": {
    name: string;
  };
};

export type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
