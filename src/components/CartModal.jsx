import { CartHeading, Close } from "./SVG";
export default function CartModal() {
  <article
    className={`w-[100%] lg:w-[45%] ${
      isCartOpen ? "translate-x-0" : "translate-x-full"
    } transition-all duration-500 delay-100 h-screen z-50 overflow-auto absolute top-0 right-0 bg-white rounded-sm flex flex-col`}
  >
    <div className="p-6 h-32 relative bg-linear-to-r text-white gap-2  from-sky-medium to-sky-high items-center justify-center  flex ">
      <h2 className=" font-oswald font-black text-5xl tracking-tighter">
        Tu Carrito
      </h2>
      <CartHeading size={60}></CartHeading>
      <button
        onClick={() => toogleCart()}
        className="absolute z-50 transition-all duration-200 delay-75 hover:scale-105 cursor-pointer hover:text-red-600 text-white top-3 right-2.5 lg:right-4"
      >
        <Close size={30}></Close>
      </button>
    </div>

    {/* Lista de productos */}
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {cart.map((cartElement) => (
        <div
          key={cartElement.cartId}
          className="flex items-center gap-4 border-b border-sky-high pb-4"
        >
          <img
            src={cartElement.img}
            alt="Producto"
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="flex-1">
            <p className="text-lg font-pacifico text-cheese font-semibold">
              {cartElement.nombre}
            </p>
            <p className="text-sm font-oswald text-gray-600">
              Cantidad: {cartElement.cantidad}
            </p>
            {cartElement.salsas && (
              <p className="text-sm font-oswald  text-gray-600">
                Salsas:{" "}
                <span className="lowercase">
                  {cartElement.salsas.join(",")}
                </span>
              </p>
            )}
            {cartElement.adiciones && (
              <p className="text-sm font-oswald  text-gray-600">
                Adiciones:{" "}
                {cartElement.adiciones
                  .map((adicion) => `${adicion.nombre} x ${adicion.cantidad}`)
                  .join(",")}
              </p>
            )}
            <p className="text-sm font-oswald text-gray-800 font-bold">
              {numberToCOP(cartElement.total)} COP
            </p>
          </div>
          <button
            onClick={() => removeItemCart(cartElement.cartId)}
            className="text-black transition-colors duration-150 delay-75 mr-3.5 cursor-pointer hover:text-red-700 font-bold"
          >
            <Trash size={32}></Trash>
          </button>
        </div>
      ))}
    </div>

    {/* Total y botón de compra (siempre abajo) */}
    <div className="p-6 border-t flex flex-col  gap-5 lg:gap  lg:flex-row justify-between items-center">
      <p className="text-xl font-oswald font-semibold">
        Total: {numberToCOP(total)} COP
      </p>
      {!isAddressSet && (
        <button
          onClick={() => generateSale()}
          className="bg-sky-high cursor-pointer text-white px-3 py-3 lg:w-auto w-[90%] rounded-lg font-bold hover:bg-sky-low transition"
        >
          Agregar dirección
        </button>
      )}
      <button
        onClick={() => generateSale()}
        className={`cursor-pointer bg-cheese  text-white  lg:w-auto px-12 py-3 w-[90%] rounded-lg font-bold hover:bg-amber-300 transition`}
      >
        Comprar
      </button>
    </div>
  </article>;
}
