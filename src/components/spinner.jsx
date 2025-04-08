export default function Spinner({ color = "border-white" }) {
  return (
    <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${color}`} />
  );
}
