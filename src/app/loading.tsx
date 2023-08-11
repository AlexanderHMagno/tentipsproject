import Image from "next/image";

function Loading() {
  return (
    <div>
      <Image
        alt="10 tips logo"
        src={"/images/logo.png"}
        width={200}
        height={200}
        lazyRoot="lazy"
      />
    </div>
  );
}

export default Loading;
