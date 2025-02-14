import { numberToCOP } from "../constants/constants";
export default function ProductCard({ openModal, product }) {
  return (
    <>
      <div className="rounded-3xl w-80 bg-gray-50 h-72 flex-col justify-between items-center  flex ">
        <img
          src={product.img}
          className="rounded-t-3xl w-full object-cover h-36 "
        />
        <div className="grid grid-cols-2 w-full px-5">
          <span className="text-cheese truncate text-xl font-black">
            {product.nombre}
          </span>
          <span className="place-self-end text-black font-black ">
            {numberToCOP(product.precio)}
          </span>
        </div>
        <button
          onClick={() => openModal(product)}
          className="w-[95%] mb-5 tracking-tighter text-center hover:bg-gray-300 transition-all duration-300 delay-75 hover:scale-95 hover:text-sky-high  font-bold font-oswald text-white h-10 rounded-lg cursor-pointer bg-sky-high "
        >
          Ver más
        </button>
      </div>
    </>
  );
}
