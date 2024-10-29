import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SerchResultProps = {
  user: TeamMember;
  resetData: () => void;
};
export default function SerchResult({ user, resetData }: SerchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["team", projectId] });
      toast.success(data);
      resetData();
    },
  });

  const handleAddUser = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          onClick={handleAddUser}
          type="button"
          className="text-purple-600 hover:bg-purple-100 px-10 py-3font-bold cursor-pointer"
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
}
