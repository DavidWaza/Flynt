export function AppBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] bg-emerald-900/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-emerald-900/5 rounded-full blur-[80px]" />
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
