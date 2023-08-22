"use client";
import Script from "next/script";

export default function AdsenseClient() {
  return (
    <Script
      id="Adsense-id"
      data-ad-client="ca-pub-7470419655173226"
      async
      strategy="afterInteractive"
      slot="5753432357"
      data-slot="5753432357"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("Script failed to load", e);
      }}
    />
  );
}
