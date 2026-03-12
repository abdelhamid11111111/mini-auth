"use client";
import { Tasks } from "@/types/types";
import React, { useEffect, useState } from "react";

interface Users {
  id: number;
  name: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const fetchUsersTasks = async () => {
    try {
      const res = await fetch("/api/task");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchUsers();
      fetchUsersTasks();
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto mt-10 p-6 flex gap-6">

        {/* Left - Users Table */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <div className="p-6 pb-0">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">All Users</h1>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 mx-6 mb-6">
            <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 px-6 py-3">
              <span className="font-semibold text-slate-600 dark:text-slate-300 text-sm">Name</span>
              <span className="font-semibold text-slate-600 dark:text-slate-300 text-sm">Email</span>
            </div>
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-2 px-6 py-4 border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-sm text-slate-800 dark:text-slate-200">{user.name}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{user.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Tasks */}
        <div className="w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Our Tasks</h1>

          <div className="flex flex-col gap-2">
            {tasks.length === 0 && (
              <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-6">
                no tasks yet
              </p>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">{task.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Users;