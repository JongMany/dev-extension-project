import Link from "next/link";
import {TaskContainer} from "@components/task";

export default async function GoalPage() {
  return (
    <main>
      <nav className="flex justify-between items-center px-4 mb-4">
        <h1 className="text-4xl font-bold">Plan</h1>
        <Link
          href="/goal/create"
          className="text-2xl font-[500] cursor transition-all duration-150 hover:font-bold"
        >
          목표 생성
        </Link>
      </nav>
      <section className="grid grid-cols-2 gap-x-4 px-6 gap-y-4 text-lg">
        <TaskContainer />
      </section>
    </main>
  );
}
