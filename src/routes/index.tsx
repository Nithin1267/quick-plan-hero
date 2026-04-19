import { createFileRoute } from "@tanstack/react-router";
import { TodoApp } from "@/components/TodoApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Smart To-Do — Plan smarter, focus deeper" },
      {
        name: "description",
        content:
          "A beautifully simple smart to-do list with priorities, due dates, search and filters. Plan your day, organize your tasks, and stay focused.",
      },
      { property: "og:title", content: "Smart To-Do — Plan smarter, focus deeper" },
      {
        property: "og:description",
        content:
          "Beautifully simple smart to-do list with priorities, due dates, search and filters.",
      },
    ],
  }),
});

function Index() {
  return <TodoApp />;
}
