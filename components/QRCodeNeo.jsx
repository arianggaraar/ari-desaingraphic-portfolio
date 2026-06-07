"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRCodeNeo({
  value = "https://www.google.com/maps/search/?api=1&query=-6.7431002,108.5114999",
  dark = true
}) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let mounted = true;

    QRCode.toDataURL(value, {
      width: 512,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: dark ? "#F4ECD8" : "#171411",
        light: dark ? "#171411" : "#F4ECD8"
      }
    }).then((url) => {
      if (mounted) setSrc(url);
    });

    return () => {
      mounted = false;
    };
  }, [value, dark]);

  return (
    <a
      href={value}
      target="_blank"
      rel="noreferrer"
      className="group relative block w-full overflow-hidden border-2 border-current bg-[var(--bg)] p-3"
      aria-label="Buka lokasi Google Maps Ari Anggara"
    >
      {src ? (
        <img
          src={src}
          alt="QR Code lokasi Ari Anggara"
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="aspect-square w-full animate-pulse bg-current/20" />
      )}

      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-current bg-[var(--accent)] text-[#111111] shadow-[4px_4px_0_var(--fg)]">
        <span className="text-xl font-black uppercase tracking-[-0.16em]">AA</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span>Scan Maps</span>
        <span>-6.7431002, 108.5114999</span>
      </div>
    </a>
  );
}
