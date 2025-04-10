import { getTodos } from "./actions/todo-actions";
import Todos from "./components/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Todos todos={todos} />
    </div>
  );
}
