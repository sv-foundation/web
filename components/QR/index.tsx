import classNames from "classnames/bind";
import React, { memo, useEffect, useRef } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type Props = {
  data?: string | number | null;
  className?: string;
  size?: number;
};

const QR = memo(({ data, className, size = 148 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("qr-code-styling").then((QRCodeStyling) => {
        const qrCode = new QRCodeStyling.default({
          width: size,
          height: size,
          type: "canvas" as const,
          data: data?.toString(),
          margin: 0,
          qrOptions: {
            errorCorrectionLevel: "L",
          },
          dotsOptions: {
            color: "#2F3335",
            type: "extra-rounded",
          },
          backgroundOptions: {
            color: "transparent",
          },
          cornersSquareOptions: {
            color: "#2F3335",
            type: "extra-rounded",
          },
          cornersDotOptions: {
            color: "#2F3335",
            type: "dot",
          },
        });

        ref.current && qrCode.append(ref.current);
      });
    }
  }, []);

  return <div className={cx("Component", className)} ref={ref} />;
});

export default QR;
