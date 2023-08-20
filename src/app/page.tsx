import About from "@/app/about/page";
import Script from "next/script";
export default function Home() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7470419655173226"
        crossOrigin="anonymous"
      ></Script>
      <About />;
    </>
  );
}
