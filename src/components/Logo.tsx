export default function Logo({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${large ? "scale-110" : ""}`}>
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-bold">
        LC
      </div>
      <span className="text-xl font-semibold tracking-tight">LeadCraft</span>
    </div>
  );
}
