import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { loadJSON, saveJSON } from '../services/storage';

// useState que sobrevive a reinicios do app (RF06).
// Le o valor salvo no useEffect inicial e so passa a gravar depois disso,
// para nunca sobrescrever o armazenamento com o valor inicial "zerado".
export function usePersistentState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const initialRef = useRef(initial);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loadJSON(key, initialRef.current).then((stored) => {
      if (!active) return;
      setValue(stored);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [key]);

  useEffect(() => {
    if (!loading) saveJSON(key, value);
  }, [key, value, loading]);

  return [value, setValue, loading];
}
