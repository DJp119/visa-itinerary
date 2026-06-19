import { useState, useCallback, useRef, useEffect } from 'react';

interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number; // milliseconds
}

interface ToastState {
  id: string;
  title: string;
  description?: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  duration: number;
}

const TOAST_DEFAULTS: ToastOptions = {
  duration: 5000,
  variant: 'default'
};

interface ToastProviderProps {
  children: React.ReactNode;
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function ToastProvider({ children, className, position = 'top-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastIdRef = useRef(0);

  const generateId = useCallback(() => {
    return `${++toastIdRef.current}`;
  }, []);

  const addToast = useCallback((options: ToastOptions) => {
    const id = options.id || generateId();
    const toast: ToastState = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? TOAST_DEFAULTS.variant,
      duration: options.duration ?? TOAST_DEFAULTS.duration
    };

    setToasts(prev => [...prev, toast]);

    // Auto-remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Clear all toasts when unmounting
  useEffect(() => {
    return () => {
      setToasts([]);
    };
  }, []);

  // Variant class mapping
  const getVariantClass = (variant: ToastState['variant']) => {
    switch (variant) {
      case 'destructive':
        return 'border-border/50 bg-destructive/20 text-destructive';
      case 'success':
        return 'border-border/50 bg-success/20 text-success';
      case 'warning':
        return 'border-border/50 bg-warning/20 text-warning';
      default:
        return 'border-border/50 bg-primary/20 text-primary';
    }
  };

  // Position class mapping
  const getPositionClass = (pos: ToastProviderProps['position']) => {
    switch (pos) {
      case 'top-right':
        return 'top-4 right-0';
      case 'top-left':
        return 'top-4 left-0';
      case 'bottom-right':
        return 'bottom-4 right-0';
      case 'bottom-left':
        return 'bottom-4 left-0';
      default:
        return 'top-4 right-0';
    }
  };

  return (
    <>
      {children}
      {/* Toasts Container */}
      <div
        className={`fixed z-50 flex flex-col-reverse space-y-3 p-4 pointer-events-none ${getPositionClass(
          position
        )} ${className || ''}`}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex w-56 items-start space-x-4 rounded-lg border p-4 shadow-lg transition-all duration-200 ease-out ${
              getVariantClass(toast.variant)
            }`}
          >
            <div className="flex-shrink-0 h-5 w-5">
              {/* Icons based on variant */}
              {toast.variant === 'success' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {toast.variant === 'destructive' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {toast.variant === 'warning' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 5a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
              )}
              {toast.variant === 'default' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                </svg>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-foreground">{toast.title}</h4>
              {toast.description && (
                <p className="text-sm text-foreground/60">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 flex h-5 w-5 items-center justify-center rounded-md hover:bg-background/100 transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const useToast = () => {
  // This would typically use React Context in a real implementation
  // For now, we'll return a simplified version
  const [, setState] = useState<{ addToast: typeof addToast; removeToast: typeof removeToast }>(
    { addToast: () => '', removeToast: () => {} }
  );

  // In a real app, this would consume the ToastProvider context
  return {
    toast: (options: Omit<ToastOptions, 'id'>) => {
      // This is a simplified implementation
      console.warn('Toast context not implemented - would show toast:', options);
    }
  };
};