"use client";
import Script from "next/script";

export default function AdsenseClient() {
  return (
    <>
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

      <Script
        async
        src="https://fundingchoicesmessages.google.com/i/pub-7470419655173226?ers=1"
        nonce="_u_lr3ILn8PD5-wNUDxGIw"
      />
      <Script id="AdBlocker" nonce="_u_lr3ILn8PD5-wNUDxGIw">
        {`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}
      </Script>
    </>
  );
}
