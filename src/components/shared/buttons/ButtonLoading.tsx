import { Loader2 } from "lucide-react";

import { ComponentProps, ReactNode } from "react";
import { Button } from "./Button";

type ButtonloadingProps = ComponentProps<typeof Button> & {
  children: ReactNode;
  isLoading: boolean;
};

export function ButtonLoading({
  children,
  isLoading,
  ...props
}: ButtonloadingProps) {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
