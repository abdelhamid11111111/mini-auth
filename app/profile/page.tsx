"use client";
import { useSession } from "@/lib/auth-client";
import { Tasks } from "@/types/types";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [title, setTitle] = useState("");

  const fetchUserTasks = async () => {
    const res = await fetch("/api/task/id");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (taskId: string) => {
    await fetch(`/api/task/id`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const load = () => {
      fetchUserTasks();
    };
    load();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setTitle("");
    }
    setTasks([{ id: Date.now().toString(), title }, ...tasks]);
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto mt-10 p-6 flex gap-6 justify-center">
        {/* Left - Profile */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8 w-80 shrink-0">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            My Profile
          </h1>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Username
              </span>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                {session?.user?.name || "User"}
              </p>
            </div>
            <div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Email
              </span>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                {session?.user?.email || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Right - Tasks */}
        <div className="w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            My Tasks
          </h1>
          <div className="flex gap-2 mb-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="add a new task..."
              className="flex-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="flex items-center justify-between text-slate-400 px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.length === 0 && (
              <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-6">
                no tasks yet
              </p>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {task.title}
                </span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 text-xs transition-colors"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
