import { ReactNode } from "react";
import Logo from "../../components/Logo";

export default function AuthLayout({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <Logo large />
          {subtitle && <p className="mt-2 text-ink-700">{subtitle}</p>}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft">
            {children}
          </div>
          <p className="mt-6 text-xs text-ink-500">
            By continuing, you agree to our Terms & Privacy.
          </p>
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="hidden md:block">
        <div className="h-full w-full bg-gradient-to-br from-brand/10 via-brand/5 to-transparent" />
        <div className="pointer-events-none absolute right-8 top-8 hidden md:block">
          <div className="rounded-2xl border border-brand/20 bg-white/70 p-4 shadow-soft backdrop-blur">
            <div className="text-sm">
              <div className="font-semibold text-ink-900">
                Write proposals 10x faster
              </div>
              <div className="mt-1 text-ink-700">
                Paste job → personalize → send. Save jobs & proposals for later.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
