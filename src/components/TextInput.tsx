import { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: ReactNode;
};

export default function TextInput({
  label,
  leftIcon,
  className = "",
  ...rest
}: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-ink-700">
          {label}
        </span>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
        <input
          {...rest}
          className={`w-full rounded-xl border border-ink-300 bg-white px-3 py-2 outline-none
                      focus:ring-2 focus:ring-brand/30 ${
                        leftIcon ? "pl-10" : ""
                      }
                      ${className}`}
        />
      </div>
    </label>
  );
}
