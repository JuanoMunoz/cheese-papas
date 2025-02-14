import { Down } from "./SVG";
export default function Header() {
  return (
    <header className="bg-cover overflow-x-hidden bg-center bg-[url(/bg.webp)] relative flex justify-center items-center w-screen h-screen">
      <section className="text-white flex flex-col justify-center z-10 h-full lg:grid grid-cols-2 absolute inset-0 bg-black/70">
        <div className="font-pacifico pl-3  lg:pl-20 pt-32 lg:col-span-1 flex flex-col gap-6  lg:gap-16 justify-start ">
          <h1 className="lg:text-8xl  text-6xl">
            <span className="text-cheese">Cheese</span>Papas
          </h1>
          <p className="font-black ml-5 text-pretty lg:ml-20 italic text-3xl  font-oswald">
            <span className="text-cheese">¡</span>Las más hpt{""}
            <span className="text-red-600">@</span>s de Marinilla{" "}
            <span className="text-cheese">!</span>
          </p>
        </div>
        <div className=" lg:py-10  z-50 h-full flex flex-col justify-center items-center  lg:col-span-1">
          <div className="w-96 h-96 relative ">
            <div className="w-44 h-44  absolute lg:top-[40%]  top-[20%] blur-xl  left-12 rounded-full bg-sky-high"></div>
            <div className="w-44 h-44  absolute lg:top-[40%] top-[20%] blur-xl left-36 rounded-full bg-sky-medium"></div>
            <div className="w-44 h-44  absolute lg:top-[20%] top-[0%] blur-xl left-40 rounded-full bg-sky-low"></div>
            <img
              src="/papona.webp"
              alt="papa-logo"
              className="w-72 h-72  absolute top-[4%] lg:top-[24%] drop-shadow-lg  left-16"
            />
          </div>
          <a
            href="#menu"
            className="font-oswald  justify-center items-center lg:flex hidden font-bold cursor-pointer hover:scale-110 hover:bg-sky-medium delay-75 transition-all duration-300
             rounded-sm bg-sky-high w-40 text-xl h-14"
          >
            {" "}
            Ordena ya
          </a>
        </div>
      </section>
      <div className="absolute  flex justify-center z-20 bottom-12 lg:bottom-6   ">
        <a
          href="#menu"
          className=" bg-radial to-gray-900 flex justify-center items-center from-gray-700 animate-bounce duration-1000 cursor-pointer w-16 h-16 rounded-full"
        >
          <Down size={30} color={"#fff"}></Down>
        </a>
      </div>
    </header>
  );
}
