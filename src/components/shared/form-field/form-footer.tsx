// components/shared/form/FormFooter.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormFooterProps {
  isSubmitting: boolean;
  isDirty: boolean;
  isCreate?: boolean;
  createMessage?: string;
  updateMessage?: string;
  noChangesMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormFooter({
  isSubmitting,
  isDirty,
  isCreate = true,
  createMessage = "Creating...",
  updateMessage = "Updating...",
  noChangesMessage = "No changes made",
  children,
  className,
}: FormFooterProps) {
  const getStatusMessage = () => {
    if (isSubmitting) {
      return isCreate ? createMessage : updateMessage;
    }
    if (isDirty) {
      return "You have unsaved changes";
    }
    return noChangesMessage;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-4 py-3 pb-8 border-t bg-muted/30 flex-shrink-0",
        "sm:pb-4 sm:gap-4 sm:px-6 sm:py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      style={{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 2rem)` }}
    >
      <div className="text-xs text-muted-foreground flex items-center gap-2 min-w-0 sm:text-sm">
        {isSubmitting && (
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        )}
        {isDirty && !isSubmitting && (
          <div className="h-2 w-2 rounded-full bg-orange-500" />
        )}
        <span>{getStatusMessage()}</span>
      </div>
      <div className="flex flex-col gap-2 w-full sm:w-auto sm:gap-3 sm:flex-row sm:items-center sm:min-w-fit">
        {children}
      </div>
    </div>
  );
}
