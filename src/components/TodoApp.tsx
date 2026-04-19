import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Calendar as CalendarIcon,
  Search,
  Sparkles,
  ListTodo,
  Flame,
  Clock,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "completed";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: number;
}

const STORAGE_KEY = "smart-todos-v2";
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const isOverdue = (date: string | null, done: boolean) => {
  if (!date || done) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};

const formatDate = (d: string | null) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const priorityStyles: Record<Priority, string> = {
  low: "bg-success/15 text-success border-success/20",
  medium: "bg-warning/15 text-warning border-warning/20",
  high: "bg-destructive/15 text-destructive border-destructive/20",
};

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      {
        id: uid(),
        text: trimmed,
        done: false,
        priority,
        dueDate: dueDate || null,
        createdAt: Date.now(),
      },
    ]);
    setText("");
    setDueDate("");
    setPriority("medium");
  };

  const toggle = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  const remove = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.done));

  const visible = useMemo(() => {
    const pOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
    return todos
      .filter((t) => {
        if (filter === "active" && t.done) return false;
        if (filter === "completed" && !t.done) return false;
        if (query && !t.text.toLowerCase().includes(query.toLowerCase()))
          return false;
        return true;
      })
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        if (a.priority !== b.priority)
          return pOrder[a.priority] - pOrder[b.priority];
        return (a.dueDate || "").localeCompare(b.dueDate || "");
      });
  }, [todos, filter, query]);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    const overdue = todos.filter((t) => isOverdue(t.dueDate, t.done)).length;
    return { total, done, active: total - done, overdue };
  }, [todos]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Smart productivity, beautifully simple
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Your day, <span className="text-gradient">organized</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Plan smarter. Focus deeper. Get the right things done.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-slide-up">
          <StatCard icon={ListTodo} label="Active" value={stats.active} />
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.done}
            tint="success"
          />
          <StatCard
            icon={Flame}
            label="Overdue"
            value={stats.overdue}
            tint="destructive"
          />
        </div>

        {/* Add form */}
        <form
          onSubmit={addTodo}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-card mb-6 animate-slide-up"
        >
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind today?"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/70 px-3 py-2 outline-none text-base"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 pl-1">
            <PrioritySelect value={priority} onChange={setPriority} />
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-input/60 px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/40 transition-smooth cursor-pointer">
              <CalendarIcon className="h-3.5 w-3.5" />
              <input
                type="date"
                value={dueDate}
                min={today}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-transparent outline-none text-foreground [color-scheme:dark]"
              />
            </label>
          </div>
        </form>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex gap-1 rounded-xl border border-border bg-card/60 backdrop-blur-sm p-1">
            {(["all", "active", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-lg capitalize transition-smooth",
                  filter === f
                    ? "bg-gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-smooth"
            />
          </div>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {visible.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-border bg-card/40 py-16 text-center animate-fade-in">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">All clear</p>
              <p className="text-sm text-muted-foreground mt-1">
                {todos.length === 0
                  ? "Add your first task to get started."
                  : "No tasks match your filters."}
              </p>
            </li>
          ) : (
            visible.map((t) => (
              <li
                key={t.id}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-card transition-smooth hover:border-primary/30 animate-slide-up",
                  t.done && "opacity-60",
                )}
              >
                <button
                  onClick={() => toggle(t.id)}
                  className="mt-0.5 shrink-0 transition-smooth hover:scale-110"
                  aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                >
                  {t.done ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-foreground break-words leading-relaxed",
                      t.done && "line-through text-muted-foreground",
                    )}
                  >
                    {t.text}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        priorityStyles[t.priority],
                      )}
                    >
                      {t.priority}
                    </span>
                    {t.dueDate && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-xs",
                          isOverdue(t.dueDate, t.done)
                            ? "text-destructive font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {formatDate(t.dueDate)}
                        {isOverdue(t.dueDate, t.done) && " · overdue"}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => remove(t.id)}
                  className="opacity-0 group-hover:opacity-100 shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        {todos.length > 0 && (
          <footer className="mt-6 flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>
              {stats.active} of {stats.total} task
              {stats.total === 1 ? "" : "s"} remaining
            </span>
            {stats.done > 0 && (
              <button
                onClick={clearCompleted}
                className="hover:text-destructive transition-smooth font-medium"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tint?: "success" | "destructive";
}) {
  const tintClass =
    tint === "success"
      ? "text-success bg-success/10"
      : tint === "destructive"
        ? "text-destructive bg-destructive/10"
        : "text-primary bg-primary/10";
  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-4 transition-smooth hover:border-primary/30">
      <div
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg mb-2",
          tintClass,
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold font-display text-foreground">
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function PrioritySelect({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (v: Priority) => void;
}) {
  const opts: Priority[] = ["low", "medium", "high"];
  return (
    <div className="inline-flex gap-1 rounded-lg border border-border bg-input/60 p-0.5">
      {opts.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-smooth",
            value === p
              ? cn(priorityStyles[p], "border")
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
