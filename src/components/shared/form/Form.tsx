import { FormEvent, ReactNode } from "react";

export type FormProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-auto max-w-md p-4 flex flex-col justify-center"
    >
      {children}
    </form>
  );
}
