"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type NoteActionsProps = {
  noteId: number;
  noteContent: string;
  updateNoteAction: (formData: FormData) => Promise<void>;
  deleteNoteAction: (formData: FormData) => Promise<void>;
};

export default function NoteActions({
  noteId,
  noteContent,
  updateNoteAction,
  deleteNoteAction,
}: NoteActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(noteContent);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("noteId", noteId.toString());
    formData.append("content", editContent);
    await updateNoteAction(formData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("noteId", noteId.toString());
    await deleteNoteAction(formData);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-zinc-900 border-2 border-teal-400 rounded-lg w-full max-w-2xl p-6">
          <h2 className="text-teal-400 text-2xl font-semibold mb-4">
            Edit Note
          </h2>
          <textarea
            value={editContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditContent(e.target.value)
            }
            rows={6}
            className="w-full px-4 py-3 bg-black border border-teal-500/50 text-teal-100 rounded-lg focus:outline-none focus:border-teal-400 resize-none"
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUpdate}
              className="flex-1 py-3 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(noteContent);
              }}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-teal-400 font-semibold rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 hover:bg-teal-400 rounded transition-colors"
      >
        <Pencil className="w-5 h-5" />
      </button>
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="p-2 hover:bg-red-400 rounded transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border-2 border-red-400 rounded-lg p-6 max-w-md">
            <h2 className="text-red-400 text-xl font-semibold mb-4">
              Delete Note?
            </h2>
            <p className="text-teal-100 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-teal-400 font-semibold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
