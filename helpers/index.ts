import * as clipboard from "clipboard-polyfill/text";
import merge from "lodash/merge";
import maxSize from "popper-max-size-modifier";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";

export type UseFormField<T> = {
  value: T;
  error: string;
  change: (v: T, er?: string) => void;
  changeError: React.Dispatch<React.SetStateAction<string>>;
  valid: boolean | null;
  validating: boolean;
  changeValid: React.Dispatch<React.SetStateAction<boolean | null>>;
  changeValidating: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useFormField<T>(
  initialValue: T,
  withResetErrorOnChange = true
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [valid, setValid] = useState<null | boolean>(null);
  const [validating, setValidating] = useState(false);

  return {
    value,
    error,
    change: (v: T, error = "") => {
      setValue(v);
      if (withResetErrorOnChange || error) setError(error);
    },
    changeError: setError,
    valid,
    validating,
    changeValid: setValid,
    changeValidating: setValidating,
  };
}

type UseDropdown = {
  onClose?(): void;
  /** @default false */
  popperMaxWidth?: boolean;
  popperOptions?: Parameters<typeof usePopper>[2];
};

/**
 *
 * @description
 * Helpful hook to craete fully contoled dropdown component
 * 1) pass `ref` to dropdown wrapper
 * 2) use `toggle` or `setOpen` actions to control visibility
 * 3) use `open` flag to display or hide dropdown's content
 * 4) for better content position use `popperRef` to select
 * dropdown content and `popper` object to pass correct position
 * @example
 * const dropdown = useDropdown()
 *
 * <div ref={dropdown.setRef} >
 *     <button onClick={dropdown.toggle}>toggle content</div>
 *
 *     {dropdown.open && (
 *         <div
 *             ref={dropdown.setPopperRef}
 *             style={dropdown.popper.styles.popper}
 *             {...dropdown.popper.attributes.popper}
 *         >
 *             content
 *         </div>
 *     )}
 * </div>
 */
export function useDropdown({
  onClose,
  popperOptions,
  popperMaxWidth = false,
}: UseDropdown = {}) {
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  // @todo check reqirement of using state
  const [popperRef, setPopperRef] = useState<
    HTMLUListElement | HTMLDivElement | null
  >(null);

  const defaultPopperOptions: Parameters<typeof usePopper>[2] = useMemo(
    () => ({
      placement: "bottom-start",

      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 12],
          },
        },

        maxSize,
        {
          name: "applyMaxSize",
          enabled: true,
          phase: "beforeWrite" as const,
          requires: ["maxSize"],
          fn({ state }) {
            state.styles.popper = {
              ...state.styles.popper,
              maxHeight: `${state.modifiersData.maxSize.height - 8}px`,
              maxWidth: popperMaxWidth
                ? `${state.rects.reference.width}px`
                : undefined,
            };
          },
        },
      ],
    }),
    []
  );

  const popper = usePopper(
    ref,
    popperRef,
    merge(defaultPopperOptions, popperOptions)
  );

  const toggle = () => {
    popper.forceUpdate?.();
    setOpen(!open);
  };

  // @todo find solution to fix wrong initial position of popper
  // const popperInstanseRef = useRef(popper)
  // popperInstanseRef.current = popper
  // useEffect(() => {
  // 	setInterval(() => {
  // 		popperInstanseRef.current.forceUpdate?.()
  // 	}, 500)
  // }, [])

  useEffect(() => {
    const mousedownListener = (e: MouseEvent) => {
      if (
        e.target &&
        !ref?.contains(e.target as Node) &&
        !popperRef?.contains(e.target as Node)
      ) {
        document.removeEventListener("mousedown", mousedownListener);
        setOpen(false);
      }
    };

    const keydownListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (open) {
      document.addEventListener("mousedown", mousedownListener);
      document.addEventListener("keydown", keydownListener);

      return () => {
        document.removeEventListener("keydown", keydownListener);
        document.removeEventListener("mousedown", mousedownListener);
      };
    } else {
      onClose?.();
    }
  }, [open, ref, popperRef]);

  return {
    open,
    toggle,
    ref,
    setRef,
    popperRef,
    setPopperRef,
    setOpen,
    popper,
  };
}

export const useWidthCondition = (conditionFn: (width: number) => boolean) => {
  const check = () => conditionFn(typeof window !== 'undefined' ? window.innerWidth : 0);

  const [condition, setCondition] = useState(check());

  useEffect(() => {
    const handleResize = () => {
      setCondition(check);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return condition;
};

/**
 * Helper to control need we close sidebar on click/tap overlay or sidebar directly
 * @param close will fire on direct click on overlay
 *
 * @example
 * const overlayClickHandler = useOverlayClickHandler(close)
 *
 * <div {...overlayClickHandler.overlayProps} className='overlay'>
 *     <div {...overlayClickHandler.componentProps}>
 *         content
 *     </div>
 * </div>
 */
export const useOverlayClickHandler = (close?: () => void) => {
  const shouldCloseRef = useRef<null | boolean>(null);

  const setShouldClose = (v: null | boolean) => {
    shouldCloseRef.current = v;
  };

  const handleOverlayOnClick = () => {
    if (shouldCloseRef.current === null) {
      setShouldClose(true);
    }

    if (shouldCloseRef.current) {
      close?.();
    }

    setShouldClose(null);
  };

  return {
    overlayProps: { onClick: handleOverlayOnClick },
    componentProps: {
      onMouseDown: () => setShouldClose(false),
      onMouseUp: () => setShouldClose(false),
      onClick: () => setShouldClose(false),
    },
  };
};

export const useCopy = () => {
  return (text: string, onCopied?: () => void) => {
    clipboard.writeText(text).then(() => {
      onCopied?.();
    });
  };
};

export const useIsTouchableDevice = () =>
  useMemo(() => {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }, []);

export const useOverflowController = () => {
  const id = useRef(Math.random() + "").current;
  const blockScroll = (el: HTMLElement) => {
    window.overflowController = window.overflowController ?? {};
    window.overflowController[id] = el || true;
    document.body.style.overflow = "hidden";
  };

  const unblockScroll = () => {
    window.overflowController = window.overflowController ?? {};
    delete window.overflowController[id];

    Object.entries(window.overflowController).forEach(([id, element]) => {
      if (typeof element === "object" && !element.parentElement) {
        delete window.overflowController[id];
      }
    });

    const hasOverflowElements = Object.values(window.overflowController).some(
      Boolean
    );

    if (!hasOverflowElements) {
      document.body.style.overflow = "";
    }
  };

  return {
    blockScroll,
    unblockScroll,
  };
};