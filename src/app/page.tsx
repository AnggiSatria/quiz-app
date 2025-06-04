import Image from "next/image";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[url('/assets/bg-image-lp.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end">
      {/* Container untuk layer-layer di bawah */}
      <div className="w-full">
        <button className="absolute right-5 top-5 rounded-full bg-[#e0a6aa] p-2.5 shadow-lg border-b-4 border-[#c27d83] active:translate-y-[2px] transition-transform duration-150 cursor-pointer z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="#fff" strokeWidth="3">
              <path d="M9 4.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h1M9 6.476c0-2.293 0-3.44.707-4.067s1.788-.439 3.95-.062l2.33.407c2.394.417 3.591.626 4.302 1.504c.711.879.711 2.149.711 4.69v6.105c0 2.54 0 3.81-.71 4.689c-.712.878-1.91 1.087-4.304 1.505l-2.328.406c-2.162.377-3.243.565-3.95-.062S9 19.817 9 17.524z" />
              <path strokeLinecap="round" d="M12 11v2" />
            </g>
          </svg>
        </button>
        <div className="w-full absolute h-[500px] bottom-[100px]">
          <Image
            src="/assets/bg-image-lp-content.png"
            alt="bg-content"
            fill
            quality={100}
            className="object-contain"
            priority
          />
        </div>

        <button className="absolute w-fit bottom-[200px] xl:bottom-[90px] left-1/2 -translate-x-1/2 rounded-3xl bg-[#e0a6aa] p-2.5 shadow-lg border-b-4 border-[#c27d83] active:translate-y-[2px] transition-transform duration-150 cursor-pointer z-10">
          <span className={`${luckiestGuy.className} text-white text-5xl`}>
            Play
          </span>
        </button>

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

        <button className="absolute left-5 bottom-20 rounded-full bg-[#e0a6aa] p-2.5 shadow-lg border-b-4 border-[#c27d83] active:translate-y-[2px] transition-transform duration-150 cursor-pointer z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 8 8"
          >
            <path
              fill="#fff"
              d="M5 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M3.5 2.5C2.67 2.5 2 3.17 2 4h1c0-.28.22-.5.5-.5s.5.22.5.5s-1 1.64-1 2.5S3.67 8 4.5 8S6 7.33 6 6.5H5c0 .28-.22.5-.5.5S4 6.78 4 6.5C4 6.14 5 4.66 5 4c0-.81-.67-1.5-1.5-1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
