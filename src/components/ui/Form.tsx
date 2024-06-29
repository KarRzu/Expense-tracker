import { FormEvent, ReactNode } from "react";

export type FormProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-[36rem] max-w-md p-12 bg-slate-200 rounded-lg flex flex-col justify-center"
    >
      {children}
    </form>
  );
}
