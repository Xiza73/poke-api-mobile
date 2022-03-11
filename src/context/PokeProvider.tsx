import { PokeContext, usePokeState } from "./PokeContext";

type IProps = {
  children: JSX.Element;
};

export function PokeProvider({ children }: IProps) {
  const { loading, setLoading, error, setError } = usePokeState();

  return (
    <PokeContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
