
import type { TodoItem } from "./types";


const BASE_URL = "https://localhost:7063/Todo"


export async function fetchTodos(): Promise<TodoItem[]> {

    const res = await fetch(BASE_URL);
    return res.json();
    
}

export async function addTodo(title:string ): Promise<TodoItem> {

    const res = await fetch(BASE_URL, {method:"POST",headers:{ "Content-Type": "application/json" },body: JSON.stringify({title,isComplete :false})});

    return res.json();

}

export async function updateTodo(todo: TodoItem): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}