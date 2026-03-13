import { useState, useContext, useMemo } from "react";
import { TarefasContext, TarefasProvider } from "./TarefasContext";
import Lista from "./components/Lista";

function AppContent() {

  const contexto = useContext(TarefasContext);

  if (!contexto) throw new Error("TarefasContext não encontrado");

  const { tarefas, adicionarTarefa } = contexto;

  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "pendentes" | "concluidas">("todas");

  const tarefasFiltradas = useMemo(() => {

    return tarefas.filter((t) => {

      if (filtro === "concluidas") return t.concluida;

      if (filtro === "pendentes") return !t.concluida;

      return true;

    });

  }, [tarefas, filtro]);

  return (
    <div style={{ padding: "2rem" }}>

      <h1>Lista de Tarefas</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite uma tarefa"
      />

      <button
        onClick={() => {
          adicionarTarefa(texto);
          setTexto("");
        }}
      >
        Adicionar
      </button>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setFiltro("todas")}>Todas</button>
        <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
        <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
      </div>

      <Lista tarefas={tarefasFiltradas} />

    </div>
  );
}

export default function App() {
  return (
    <TarefasProvider>
      <AppContent />
    </TarefasProvider>
  );
}
