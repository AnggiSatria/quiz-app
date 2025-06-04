import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[url('/assets/bg-image-lp.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end">
      {/* Container untuk layer-layer di bawah */}
      <div className="w-full">
        {/* Layer content */}
        <div className="w-full absolute h-[300px] mb-4 !top-0">
          <Image
            src="/assets/bg-image-lp-content.png"
            alt="bg-content"
            fill
            quality={100}
            className="object-contain"
            priority
          />
        </div>

        {/* Layer mountain */}
        <div className="w-full absolute bottom-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
          <Image
            src="/assets/bg-image-lp-mountain.png"
            alt="bg-mountain"
            fill
            quality={100}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
