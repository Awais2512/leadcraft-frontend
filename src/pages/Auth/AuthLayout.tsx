import { ReactNode } from "react";
import logoImg from "../img/image.png"; 

export default function AuthLayout({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left: Auth Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <Logo large /> */}
            <span className="text-xl font-semibold text-gray-800">LeadCraft</span>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}

          {/* Auth Form */}
          <div className="mt-6 rounded-xl bg-white p-8 shadow-md border border-gray-200">
            {children}
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right: Branding / Promo Panel */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white relative">
        <div className="max-w-md text-center px-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Write proposals 10x faster 🚀
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Paste job → personalize → send. Save jobs & proposals for later.
          </p>
        </div>
      </div>
    </div>
  );
}
