import { createContext, useContext, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface pokeState {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

const initialPokeState: pokeState = {
  loading: false,
  setLoading: () => {},
  error: false,
  setError: () => {},
};

export const PokeContext = createContext(initialPokeState);

export const usePokeState = (): pokeState => {
  const context = useContext(PokeContext);
  if (!context) throw new Error("No existe proveedor para autenticación");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = () => {
      setLoading(false);
      setError(false);
    };

    return () => {
      unsubscribe();
    };
  });

  return {
    loading,
    setLoading,
    error,
    setError,
  };
};
