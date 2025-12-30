import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import {
  createNoteAction,
  updateNoteAction,
  deleteNoteAction,
  logoutAction,
} from "@/app/actions";
import { redirect } from "next/navigation";
import { BookOpen, LogOut } from "lucide-react";
import NoteModal from "./NoteModal";
import NoteActions from "./NoteActions";

type Note = {
  id: number;
  content: string;
  createdAt: Date;
  userId: number;
};

interface PrismaNoteDelegate {
  findMany(args?: {
    where?: { userId?: number };
    orderBy?: { createdAt?: "asc" | "desc" };
    take?: number;
    skip?: number;
  }): Promise<Note[]>;
}

interface PrismaUserDelegate {
  findUnique(args: {
    where: { id: number };
    select?: { username?: boolean };
  }): Promise<{ username: string } | null>;
}

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");

  const noteDelegate = (prisma as unknown as { note: PrismaNoteDelegate }).note;
  const userDelegate = (prisma as unknown as { user: PrismaUserDelegate }).user;

  const notes = await noteDelegate.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const user = await userDelegate.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-8 pb-12">
        <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
          <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-teal-400 stroke-[1.5] shrink-0" />
          <h1 className="text-teal-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light whitespace-nowrap overflow-hidden text-ellipsis">
            Salve, {user?.username || "User"}
          </h1>
        </div>

        {/* Logout Button */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="px-8 max-w-7xl mx-auto">
        {/* Add New Note Button */}
        <NoteModal createNoteAction={createNoteAction} />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="px-6 py-4 bg-teal-300 text-black text-xl rounded-lg flex flex-col gap-3"
            >
              <p className="flex-1 wrap-break-words">{note.content}</p>
              <div className="flex justify-end">
                <NoteActions
                  noteId={note.id}
                  noteContent={note.content}
                  updateNoteAction={updateNoteAction}
                  deleteNoteAction={deleteNoteAction}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
