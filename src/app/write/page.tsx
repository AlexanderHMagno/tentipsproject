import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Write() {
  return (
    <article className="p-5 mb-32 w-full lg:max-w-4xl m-auto">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left ">
        We Are Looking for New Writers!
      </h1>

      <div className={`mb-10 sm:mx-0 `}>
        <div className="sm:mx-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BLOG_IMAGES_URL}594090.jpg`}
            width={1300}
            height={630}
            priority
            className={`shadow-sm w-full max-w-full z-0`}
            alt={`image of working hard`}
          />
        </div>
      </div>

      <small className="-mt-16 mb-5 block ml-5 bg-black text-white">
        by{" "}
        <Link
          aria-label={`image Author StartupStockPhotos`}
          target="_blank"
          href={`https://pixabay.com/users/StartupStockPhotos`}
        >
          StartupStockPhotos
        </Link>{" "}
        via{" "}
        <Link target="_blank" href={"https://pixabay.com"}>
          Pixabay
        </Link>
      </small>

      <div className="max-w-2xl mx-auto mt-10">
        <p>
          Are you a wordsmith with a burning passion for writing? Do you have a
          deep well of knowledge that you are eager to share with the world? If
          so, we are excited to invite you to become a valuable part of our team
          of writers!
        </p>

        <h2 className="font-bold py-5">About Us:</h2>
        <p>
          At 10 Tips, we are dedicated to providing our readers with
          high-quality, insightful, and engaging content on a wide range of
          topics. From technology and science to lifestyle and culture, we cover
          it all. Our platform is a space for writers to express their
          expertise, share their unique perspectives, and connect with an
          ever-growing audience.{" "}
          <Link className="font-bold" href={"/about"}>
            Learn More
          </Link>
        </p>

        <h2 className="font-bold py-5">What We are Looking For:</h2>
        <p>
          We are in search of talented individuals who are enthusiastic about
          writing and committed to delivering well-researched, informative, and
          captivating articles. Whether you are an experienced wordsmith or a
          rising star in the writing world, we welcome your voice to join ours.
        </p>

        <h2 className="font-bold py-5">Responsibilities:</h2>

        <ul>
          <li>
            Craft well-written, original articles that resonate with our
            readership.
          </li>
          <li>
            Conduct thorough research to ensure accuracy and depth in your
            writing.
          </li>
          <li>
            Collaborate with our editorial team to refine and improve your
            content.
          </li>
          <li>Meet deadlines and consistently deliver top-notch articles.</li>
        </ul>

        <h2 className="font-bold py-5">Qualifications:</h2>

        <p>
          A strong passion for writing and a genuine love for sharing knowledge.
          Excellent command of the English language and exceptional writing
          skills. Ability to research, comprehend, and present information in a
          clear and engaging manner. Adept at working independently while also
          being open to feedback and collaboration.
        </p>

        <h2 className="font-bold py-5">Why Join Us:</h2>

        <ul>
          <li>
            Opportunity to showcase your expertise to a broad and engaged
            audience.
          </li>
          <li>
            Flexible work arrangement that fits your schedule and commitments.
          </li>
          <li>
            Collaborative and supportive environment that encourages growth and
            creativity.
          </li>
          <li>
            Competitive compensation for your valuable contributions (calculated
            dynamically the more you write the more you can earn).
          </li>
        </ul>
        <p>
          If you are ready to embark on a journey of creativity, learning, and
          impact, we encourage you to apply! Join our team of dedicated writers
          who are shaping the way people think and learn.
        </p>

        <p>
          To express your interest, please send us your resume, a brief
          introduction, and a writing sample that best represents your style and
          expertise to{" "}
          <span className="font-bold">
            <Link href={"mailto:10tips.manager@gmail.com"}>This email</Link>.
          </span>
        </p>
      </div>

      <Link
        className="flex mt-10"
        target="_blank"
        href="/blog/64d5cac0d9a40741a2f081ff"
      >
        <Button className="m-auto" variant={"outline"}>
          Check This writting example
        </Button>
      </Link>
    </article>
  );
}
