import { createContext, ReactNode } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type Tarefa = {
  id: number;
  texto: string;
  concluida: boolean;
};

type TarefasContextType = {
  tarefas: Tarefa[];
  adicionarTarefa: (texto: string) => void;
  concluirTarefa: (id: number) => void;
  removerTarefa: (id: number) => void;
};

export const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function TarefasProvider({ children }: Props) {

  const [tarefas, setTarefas] = useLocalStorage<Tarefa[]>("tarefas", []);

  const adicionarTarefa = (texto: string) => {
    if (!texto.trim()) return;

    const nova: Tarefa = {
      id: Date.now(),
      texto,
      concluida: false
    };

    setTarefas([...tarefas, nova]);
  };

  const concluirTarefa = (id: number) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  const removerTarefa = (id: number) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <TarefasContext.Provider
      value={{ tarefas, adicionarTarefa, concluirTarefa, removerTarefa }}
    >
      {children}
    </TarefasContext.Provider>
  );
}