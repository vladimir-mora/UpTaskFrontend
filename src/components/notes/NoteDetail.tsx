import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createBy._id, [data]);

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const handleDelete = () => {
    mutate({
      projectId,
      taskId,
      noteId: note._id,
    });
  };

  if (isLoading) return "Cargando...";
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="">
        <p>
          {note.content} por:{" "}
          <span className="font-bold ">{note.createBy.name}</span>{" "}
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
