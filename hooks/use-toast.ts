"use client";

import { toast as sonnerToast, ExternalToast } from "sonner";

export type Toast = {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function useToast() {
  const toast = (props: Toast) => {
    const { title, description, duration = 3000, action } = props;

    const message = title
      ? `${title}${description ? `: ${description}` : ""}`
      : description;

    if (action) {
      return sonnerToast(message, {
        duration,
        action: {
          label: action.label,
          onClick: action.onClick,
        },
      });
    }

    return sonnerToast(message, { duration });
  };

  return {
    toast,
    dismiss: (id?: string) => {
      if (id) {
        sonnerToast.dismiss(id);
      } else {
        sonnerToast.dismiss();
      }
    },
  };
}

// Export sonner's toast variants directly for convenience
export const toast = {
  success: (message: string, options?: ExternalToast) =>
    sonnerToast.success(message, options),
  error: (message: string, options?: ExternalToast) =>
    sonnerToast.error(message, options),
  loading: (message: string, options?: ExternalToast) =>
    sonnerToast.loading(message, options),
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: ExternalToast,
  ) => sonnerToast.promise(promise, { ...messages, ...options }),
  custom: (
    component: (id: string | number) => React.ReactElement,
    options?: ExternalToast,
  ) => sonnerToast.custom(component, options),
};
