import React from "react";
import { Tarefa } from "../TarefasContext";

type Props = {
  tarefa: Tarefa;
  concluirTarefa: (id: number) => void;
  removerTarefa: (id: number) => void;
};

function Item({ tarefa, concluirTarefa, removerTarefa }: Props) {

  return (
    <li>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => concluirTarefa(tarefa.id)}
      />

      <span
        style={{
          textDecoration: tarefa.concluida ? "line-through" : "none"
        }}
      >
        {tarefa.texto}
      </span>

      <button onClick={() => removerTarefa(tarefa.id)}>
        Remover
      </button>
    </li>
  );
}

export default React.memo(Item);