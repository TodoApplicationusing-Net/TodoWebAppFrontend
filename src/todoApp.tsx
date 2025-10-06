import React, { useEffect, useState } from "react";
import type { TodoItem } from "./types";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";


const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTodos().then(data => {
            setTodos(data);
            setLoading(false);
        });
    }, []);

    async function handleAdd() {
        if (!newTitle.trim()) return;
        await addTodo(newTitle);
        setNewTitle("");
        // Refresh list from backend
        setLoading(true);
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
        setLoading(false);
    }

    async function handleToggle(todo: TodoItem) {
        const updated = await updateTodo({ ...todo, isComplete: !todo.isComplete });
        setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
    }

    async function handleDelete(id: string) {
        await deleteTodo(id);
        setTodos(todos.filter(t => t.id !== id));
    }

    console.log(todos);

    return (
        <Card className="w-[600px] ">
            <CardHeader>
                <CardTitle>Todo List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="New todo..."
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                    />
                    <Button onClick={handleAdd}>Add</Button>
                </div>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {todos.map(todo => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-2 justify-between p-2 rounded hover:bg-muted transition"
                            >
                                <div className="flex items-center gap-1 " onClick={() => handleToggle(todo)}>



                                    <div
                                        className={`cursor-pointer ${todo.isComplete ? "line-through text-muted-foreground" : ""}`}> {todo.title}   </div>

                                </div>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(todo.id)}>
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

export default TodoApp;
