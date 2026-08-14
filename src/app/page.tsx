import TaskPage from "@/features/task/pages/TaskPage";
import ProtectedLayout from "./(protected)/layout";

export default function Home() {
  return (
    <ProtectedLayout>
      <div className="flex flex-col flex-1 items-stretch justify-start font-sans bg-background dark:bg-foreground w-full h-full">
        <TaskPage />
      </div>
    </ProtectedLayout>
  );
}
