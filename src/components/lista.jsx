import Item from "./Item";
import { useContext } from "react";
import { TarefasContext } from "../TarefasContext";

export default function Lista({ tarefas }) {

  const contexto = useContext(TarefasContext);

  if (!contexto) throw new Error("TarefasContext não encontrado");

  const { concluirTarefa, removerTarefa } = contexto;

  return (
    <ul>
      {tarefas.map((t) => (
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