import Image from "next/image";

export default function Logo() {
  return (
    <Image
      width={150}
      height={150}
      src={"/images/logo.png"}
      alt="10 tips idea"
      priority={true}
    />
  );
}
