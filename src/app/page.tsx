import ProtectedLayout from "./(protected)/layout";

export default function Home() {
  return (
    <ProtectedLayout>
      {/* To show tasks component */}
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-background h-full">
        TASK
      </div>
    </ProtectedLayout>
  );
}
