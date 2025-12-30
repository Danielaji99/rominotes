"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

type NoteModalProps = {
  createNoteAction: (formData: FormData) => Promise<void>;
};

export default function NoteModal({ createNoteAction }: NoteModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", noteContent);
    await createNoteAction(formData);
    setNoteContent("");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Add New Note Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="w-full flex items-center gap-4 px-6 py-4 bg-teal-300 hover:bg-teal-400 text-gray-700 text-xl rounded-lg transition-colors"
        >
          <Plus className="w-6 h-6" />
          <span>Add new note...</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border-2 border-teal-400 rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-teal-400 text-2xl font-semibold">
                Create New Note
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your note here..."
              required
              rows={6}
              className="w-full px-4 py-3 bg-black border border-teal-500/50 text-teal-100 placeholder-teal-700 rounded-lg focus:outline-none focus:border-teal-400 transition-colors resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                disabled={!noteContent.trim()}
                className="flex-1 py-3 bg-teal-400 hover:bg-teal-500 disabled:bg-teal-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNoteContent("");
                }}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-teal-400 font-semibold rounded-lg transition-colors"
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
