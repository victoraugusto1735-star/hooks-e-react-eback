import Item from "./Item";
import { useContext } from "react";
import { TarefasContext, Tarefa } from "../TarefasContext";

type Props = {
  tarefas: Tarefa[];
};

export default function Lista({ tarefas }: Props) {

  const contexto = useContext(TarefasContext);

  if (!contexto) throw new Error("TarefasContext não encontrado");

  const { concluirTarefa, removerTarefa } = contexto;

  return (
    <ul>
      {tarefas.map((t: Tarefa) => (
        <Item
          key={t.id}
          tarefa={t}
          concluirTarefa={concluirTarefa}
          removerTarefa={removerTarefa}
        />
      ))}
    </ul>
  );
}