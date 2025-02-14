import { useEffect, useState } from "react";
import data from "../assets/mock-data.json";
import { Close } from "./SVG";
import Adicion from "./Adiciones";
import { numberToCOP } from "../constants/constants";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "./modal.css";
export default function Modal({
  isFriesSection,
  activeProduct,
  isModalOpen,
  toogleModal,
  setCart,
}) {
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedAdittions, setSelectedAdittions] = useState([]);
  const minusOne = () => setCounter(counter === 1 ? counter : counter - 1);
  const plusOne = () => setCounter(counter + 1);
  const addToCart = () => {
    const newProduct = {
      ...activeProduct,
      cantidad: counter,
      total,
      ...(isFriesSection &&
        selectedSauces.length >= 1 && { salsas: selectedSauces }),
      ...(isFriesSection &&
        selectedAdittions.length >= 1 && { adiciones: selectedAdittions }),
    };
    toogleModal();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...newProduct, cartId: cart.length + 1 });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Producto agregado con exito al carrito", {
      className: "my-toast",
      position: "top-right",
    });
    setSelectedAdittions([]);
    setSelectedSauces([]);
    setTotal(0);
    setCounter(1);
  };
  const addSause = (e) => {
    const { checked, value } = e.target;
    setSelectedSauces((prev) =>
      checked ? [...prev, value] : prev.filter((sauce) => sauce !== value)
    );
  };
  useEffect(() => {
    if (activeProduct)
      setTotal(
        counter * activeProduct.precio +
          selectedAdittions.reduce(
            (partialSum, arr) => partialSum + arr.total,
            0
          )
      );
  }, [counter, activeProduct, selectedAdittions]);
  return (
    <dialog
      className={`fixed transform ${
        isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } flex justify-center items-center transition-all duration-300 h-screen z-40 w-screen inset-0 bg-black/80`}
    >
      <article className="w-[90%] lg:w-[35%]  h-[80%] lg:h-[90%] z-50 overflow-auto relative bg-white rounded-xl">
        <button
          onClick={() => toogleModal()}
          className="absolute z-50 transition-all duration-200 delay-75 hover:scale-105 cursor-pointer hover:text-red-600 text-white top-3 right-2"
        >
          <Close size={24}></Close>
        </button>
        <div
          className={`w-full grow relative h-[50%] bg-[length:100%_100%] rounded-t-xl`}
          style={{
            backgroundImage: activeProduct
              ? `url(${activeProduct.img})`
              : "none",
          }}
        >
          <div className="bg-black/35 rounded-t-xl absolute w-full h-full inset-0"></div>
        </div>
        <header className="flex justify-between px-6 items-center text-3xl font-bold italic  mt-8 ">
          <span className="font-pacifico  text-cheese ">
            "{activeProduct && activeProduct.nombre}"
          </span>{" "}
          <span className="text-black ml-4 font-oswald">
            {activeProduct && numberToCOP(activeProduct.precio)}
          </span>
        </header>
        <p className="py-2 mt-4  font-oswald font-semibold text-pretty px-6">
          {activeProduct && activeProduct.descripcion}
        </p>
        {isFriesSection && (
          <>
            <details className=" flex px-6 mt-6  flex-col">
              <summary className="text-xl cursor-pointer w-full  font-semibold italic">
                Elige tus salsas
              </summary>
              <div className="mt-8 flex flex-col gap-3">
                {data.salsas.map((salsa, idx) => (
                  <div key={idx} className="flex pl-3 items-center mb-4">
                    <input
                      onChange={(e) => addSause(e)}
                      id={salsa}
                      type="checkbox"
                      checked={selectedSauces.includes(salsa)}
                      value={salsa}
                      className="w-5 h-5  appearance-none border-2 border-gray-300 rounded-sm checked:bg-sky-high checked:border-sky-medium flex items-center justify-center"
                    />
                    <label
                      htmlFor={salsa}
                      className="ms-2 cursor-pointer text-sm font-medium text-gray-900"
                    >
                      {salsa}
                    </label>
                  </div>
                ))}
              </div>
            </details>
            <details className=" flex px-6 my-6  flex-col">
              <summary className="text-xl cursor-pointer w-full  font-semibold italic">
                Elige tus adiciones
              </summary>
              <div className="mt-8 flex flex-col gap-3">
                {data.adiciones.map((adicion) => (
                  <Adicion
                    setAdiciones={setSelectedAdittions}
                    currentAdiciones={selectedAdittions}
                    isModalOpen={isModalOpen}
                    key={adicion.id}
                    adicion={adicion}
                  ></Adicion>
                ))}
              </div>
            </details>
          </>
        )}
        <section className="flex justify-between gap-4 px-5 lg:px-8 my-8">
          <div className="flex justify-baseline text-xl items-center gap-3">
            <span
              onClick={() => {
                minusOne();
              }}
              className=" font-bold text-2xl text-cheese hover:scale-105 cursor-pointer select-none"
            >
              -
            </span>
            <span className="font-bold">{counter}</span>
            <span
              onClick={() => {
                plusOne();
              }}
              className="font-bold text-cheese hover:scale-105 cursor-pointer select-none"
            >
              +
            </span>
          </div>
          <button
            onClick={() => addToCart()}
            className="flex w-52 rounded-full hover:bg-sky-400 cursor-pointer py-1 flex-col bg-sky-700 text-white font-bold text-xl"
          >
            <span className="text-sm font-medium">Añadir</span>
            <span>{numberToCOP(total)}</span>
          </button>
        </section>
      </article>
    </dialog>
  );
}
