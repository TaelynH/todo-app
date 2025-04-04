import { TodoList } from '@/components/TodoList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="w-full max-w-5xl">
        <TodoList />
      </div>
    </main>
  );
}
