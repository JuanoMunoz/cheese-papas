export default function Bento() {
  return (
    <section>
      <div className="my-5  w-full tracking-widest py-10 px-5 bg-sky-high font-oswald text-center border-y-8 border-cheese text-white font-bold text-3xl lg:text-6xl">
        <h3>¡PARCHATE LA EXPERIENCIA!</h3>
      </div>
      <div className="grid p-10 grid-rows-6 grid-cols-3 gap-4 h-[700px]">
        <div className="rounded-lg hover:scale-95 transition-all duration-300 lg:grayscale-100 cursor-pointer hover:grayscale-0 bg-[url(/grid1.jpg)] bg-cover row-span-4 col-span-1 flex items-center justify-center text-white font-bold text-lg"></div>
        <div className="rounded-lg hover:scale-95 transition-all duration-300 lg:grayscale-100 cursor-pointer hover:grayscale-0 bg-[url(/grid2.jpg)] bg-cover row-span-2 col-span-1 flex items-center justify-center text-white font-bold"></div>
        <div className="rounded-lg hover:scale-95 transition-all duration-300 lg:grayscale-100 cursor-pointer hover:grayscale-0 bg-[url(grid5.jpg)] bg-[length:100%_100%] row-span-2 col-span-1 flex items-center justify-center text-white font-bold"></div>
        <div className="rounded-lg hover:scale-95 transition-all duration-300 lg:grayscale-100 cursor-pointer hover:grayscale-0 bg-[url(/grid3.jpg)] bg-cover row-span-2 col-span-2 flex items-center justify-center text-white font-bold"></div>
        <div className="rounded-lg hover:scale-95 transition-all duration-300 lg:grayscale-100 cursor-pointer hover:grayscale-0 bg-[url(/grid4.jpg)] bg-cover row-span-3 col-span-3 flex items-center justify-center text-white font-bold text-2xl"></div>
      </div>
    </section>
  );
}
