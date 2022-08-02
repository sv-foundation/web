import classNames from "classnames/bind";
import { IconClose } from "components/Icons";
import QR from "components/QR";
import Button from "components/UIKit/Button";
import { useOverflowController, useOverlayClickHandler } from "helpers";
import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const ANIM_DURATION_BG = 250;
export const ANIM_DURATION_MODAL = 600;

const ModalWithQr = memo(
  ({
    data,
    isOpen,
    close,
  }: {
    data: string;
    isOpen: boolean;
    close(): void;
  }) => {
    const [modalActive, setModalActive] = useState(false);
    const isFirstRenderRef = useRef(true);
    const closeTimeoutId = useRef<any>();
    const overflowController = useOverflowController();

    const closeRef = useRef(close);
    useEffect(() => {
      closeRef.current = close;
    }, [close]);

    const onExternalCloseRef = useRef<() => void>();
    const modalPortalRef = useRef<HTMLDivElement | null>(null);
    const modalPortal = modalPortalRef.current;
    const modalWrapperRef = useRef<HTMLElement>(null);
    const isClosing = (modalActive || isOpen) && !(modalActive && isOpen);
    const showModal = modalActive && isOpen;

    useEffect(() => {
      modalPortalRef.current = document.createElement("div");

      return () => {
        modalPortal && modalPortal.remove();
        overflowController.unblockScroll();
        clearInterval(closeTimeoutId.current);
      };
    }, []);

    /** create portal container, mount it and set "ready" flag */
    const prepareEnvironment = () => {
      modalPortal && document.body.appendChild(modalPortal);
      return setTimeout(() => {
        setModalActive(true);
        overflowController.blockScroll(modalPortal!);
        modalWrapperRef.current?.scrollTo(0, 0);
      });
    };

    const unmountEnvironment = (
      onBeforeAnimation = () => setModalActive(false),
      onEndAnimation = closeRef.current
    ) => {
      // enable body's overflow
      overflowController.unblockScroll();
      onBeforeAnimation();
      closeTimeoutId.current = setTimeout(() => {
        onExternalCloseRef.current = undefined;
        onEndAnimation?.();
        modalPortal && modalPortal.remove();
      }, ANIM_DURATION_MODAL);
    };

    const overlayClickHandler = useOverlayClickHandler(unmountEnvironment);

    /**
     * on change `isOpen`
     * if `isOpen` is true - create portal container, render it and set "ready" flag
     * otherwise remove all event listeners and close modal
     */
    useEffect(() => {
      if (isOpen) {
        const tid = prepareEnvironment();
        onExternalCloseRef.current = () => {
          unmountEnvironment(closeRef.current, () => {
            setModalActive(false);
          });
          onExternalCloseRef.current = undefined;
        };

        return () => clearTimeout(tid);
      } else {
        if (isFirstRenderRef.current) {
          isFirstRenderRef.current = false;
          return;
        }
        onExternalCloseRef.current?.();
      }
    }, [isOpen]);

    if ((!isOpen && !modalActive) || !modalPortal) return null;

    return createPortal(
      <aside
        {...overlayClickHandler.overlayProps}
        ref={modalWrapperRef}
        style={{
          transitionDuration: `${ANIM_DURATION_BG}ms`,
          transitionDelay: isClosing
            ? `${ANIM_DURATION_BG * 0.8}ms`
            : undefined,
        }}
        className={cx("Component", modalActive && isOpen && "show")}
      >
        <Button
          className={cx("BtnClose")}
          onClick={() => unmountEnvironment()}
          color="sand"
          iconLeft={<IconClose />}
        />
        <div
          {...overlayClickHandler.componentProps}
          style={{
            transitionDuration: `${ANIM_DURATION_MODAL}ms`,
            transitionDelay: showModal
              ? `${ANIM_DURATION_BG * 0.2}ms`
              : undefined,
          }}
          className={cx("Modal")}
        >
          <QR data={data} size={224} />
        </div>
      </aside>,
      modalPortal
    );
  }
);

export default ModalWithQr;
