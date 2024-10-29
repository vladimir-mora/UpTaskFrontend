import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};

export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-xs font-semibold p-2 uppercase border border-dashed border-gray-500 mt-5 grid place-content-center text-slate-500"
    >
      soltar tarea aqui
    </div>
  );
}
