"use server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { createSession, getSessionUserId, destroySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type User = { id: number; username: string; password: string };
type Note = { id: number; content: string; userId: number; createdAt: Date };

type UserDelegate = {
  create(args: { data: { username: string; password: string } }): Promise<User>;
  findUnique(args: { where: { username: string } }): Promise<User | null>;
};

type NoteDelegate = {
  create(args: { data: { content: string; userId: number } }): Promise<Note>;
  update(args: {
    where: { id: number; userId: number };
    data: { content: string };
  }): Promise<Note>;
  delete(args: { where: { id: number; userId: number } }): Promise<Note>;
};

const db = prisma as unknown as { user: UserDelegate; note: NoteDelegate };

/* REGISTER */
export async function registerAction(prevState: unknown, formData: FormData) {
  const rawUsername = formData.get("username");
  const rawPassword = formData.get("password");
  const username = typeof rawUsername === "string" ? rawUsername.trim() : "";
  const password = typeof rawPassword === "string" ? rawPassword : "";

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const hashedPassword = await hashPassword(password);
    await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  } catch {
    return { error: "Username already exists" };
  }

  redirect("/login");
}

/* LOGIN */
export async function loginAction(prevState: unknown, formData: FormData) {
  const rawUsername = formData.get("username");
  const rawPassword = formData.get("password");
  const username = typeof rawUsername === "string" ? rawUsername.trim() : "";
  const password = typeof rawPassword === "string" ? rawPassword : "";

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: "Username does not exist" };
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return { error: "Invalid password" };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

/* LOGOUT */
export async function logoutAction() {
  await destroySession();
  redirect("/login");
}

/* CREATE NOTE */
export async function createNoteAction(formData: FormData) {
  const rawContent = formData.get("content");
  const content = typeof rawContent === "string" ? rawContent.trim() : "";
  const userId = await getSessionUserId();

  if (!userId || typeof userId !== "number") throw new Error("Unauthorized");
  if (!content) throw new Error("Note content cannot be empty");

  await db.note.create({
    data: {
      content,
      userId,
    },
  });

  revalidatePath("/dashboard");
}

/* UPDATE NOTE */
export async function updateNoteAction(formData: FormData) {
  const rawNoteId = formData.get("noteId");
  const rawContent = formData.get("content");

  const noteId = typeof rawNoteId === "string" ? parseInt(rawNoteId, 10) : null;
  const content = typeof rawContent === "string" ? rawContent.trim() : "";

  const userId = await getSessionUserId();
  if (!userId || typeof userId !== "number") throw new Error("Unauthorized");
  if (!noteId || isNaN(noteId)) throw new Error("Invalid note ID");
  if (!content) throw new Error("Note content cannot be empty");

  await db.note.update({
    where: { id: noteId, userId },
    data: { content },
  });

  revalidatePath("/dashboard");
}

/* DELETE NOTE */
export async function deleteNoteAction(formData: FormData) {
  const rawNoteId = formData.get("noteId");
  const noteId = typeof rawNoteId === "string" ? parseInt(rawNoteId, 10) : null;

  const userId = await getSessionUserId();
  if (!userId || typeof userId !== "number") throw new Error("Unauthorized");
  if (!noteId || isNaN(noteId)) throw new Error("Invalid note ID");

  await db.note.delete({
    where: { id: noteId, userId },
  });

  revalidatePath("/dashboard");
}
