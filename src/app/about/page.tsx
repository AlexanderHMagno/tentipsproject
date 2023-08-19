import Image from "next/image";

function About() {
  return (
    <>
      <section className="">
        <div className="container gap-16 items-center px-4 mx-auto max-w-screen-xl">
          <div className="px-5 md:px-20 py-0 font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Who we are
            </h2>

            <div>
              <p className="mb-4">
                Welcome to 10 Tips, your go-to source for insightful advice on a
                wide range of topics. Our mission is simple: to provide you with
                concise and actionable tips that can make a positive impact on
                various aspects of your life.
              </p>

              <p className="mb-4">
                At 10 Tips, we believe that the power of knowledge lies in its
                accessibility and applicability. That is why we have curated a
                collection of precisely 10 tips for each topic we cover. Whether
                you are seeking guidance on personal growth, health, technology,
                travel, or anything in between, our succinct and practical tips
                are designed to empower you.
              </p>

              <p className="mb-4">
                Our team of experts scours the realms of expertise to bring you
                the most valuable and relevant insights. With our user-friendly
                format, you will find it easy to absorb and implement our
                advice, saving you time and effort. From enhancing your
                well-being to mastering new skills, 10 Tips is here to inspire
                and guide you on your journey to success and fulfillment.
              </p>

              <p className="mb-4">
                Join us in embracing the transformative power of focused advice.
                Explore our collection of 10 tips and embark on a path of
                continuous improvement, one tip at a time. Your success story
                begins here with 10 Tips!
              </p>
              <Image
                width={400}
                height={400}
                className="w-auto mt-auto lg:mt-10 rounded-lg float-right"
                src="/images/logo.png"
                alt="office content 2"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
