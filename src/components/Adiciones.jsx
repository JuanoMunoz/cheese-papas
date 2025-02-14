import { useEffect, useState } from "react";
import { numberToCOP } from "../constants/constants";
export default function Adicion({
  adicion,
  isModalOpen,
  currentAdiciones,
  setAdiciones,
}) {
  useEffect(() => {
    !isModalOpen && setCounter(0);
  }, [isModalOpen]);
  const [counter, setCounter] = useState(0);
  const minusOne = () => {
    if (counter === 0) return;
    const idx = currentAdiciones?.findIndex(
      (currentAdicion) => currentAdicion.nombre === adicion.nombre
    );
    setAdiciones((prev) =>
      counter === 1
        ? prev.filter(
            (activeAdicion) => adicion.nombre !== activeAdicion.nombre
          )
        : prev.map((currentAdicion, i) =>
            idx === i
              ? {
                  ...currentAdicion,
                  cantidad: currentAdicion.cantidad - 1,
                  total: (currentAdicion.cantidad - 1) * adicion.precio,
                }
              : currentAdicion
          )
    );
    setCounter(counter - 1);
  };
  const plusOne = () => {
    const idx = currentAdiciones.findIndex(
      (currentAdicion) => currentAdicion.nombre === adicion.nombre
    );
    setAdiciones((prev) =>
      idx === -1
        ? [
            ...prev,
            { nombre: adicion.nombre, cantidad: 1, total: adicion.precio },
          ]
        : prev.map((currentAdicion, i) =>
            idx === i
              ? {
                  ...currentAdicion,
                  cantidad: currentAdicion.cantidad + 1,
                  total: (currentAdicion.cantidad + 1) * adicion.precio,
                }
              : currentAdicion
          )
    );
    setCounter(counter + 1);
  };
  return (
    <div
      key={adicion.id}
      className="flex justify-between items-center pl-2 mb-4"
    >
      <span className="ms-2 font-oswald capitalize cursor-pointer text-md font-medium text-gray-900">{`${
        adicion.nombre
      } (${numberToCOP(adicion.precio)})`}</span>
      <div className="flex justify-center items-center gap-4">
        <span
          onClick={() => {
            minusOne();
          }}
          className=" font-bold text-4xl text-cheese hover:scale-105 cursor-pointer select-none"
        >
          -
        </span>
        <span className="font-bold mt-2.5">{counter}</span>
        <span
          onClick={() => {
            plusOne();
          }}
          className="font-bold text-3xl text-cheese hover:scale-105 cursor-pointer select-none"
        >
          +
        </span>
      </div>
    </div>
  );
}
