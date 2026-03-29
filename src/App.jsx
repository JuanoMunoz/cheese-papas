import "./App.css";
import Modal from "./components/Modal";
import FloatButton from "./components/FloatButton";
// import data from "./assets/mock-data.json";
import { useEffect, useState } from "react";
import { Cart, CartHeading, Close, Trash, House, Location } from "./components/SVG";
import Header from "./components/Header";
import CarrouselProducts from "./components/CarrouselProducts";
import Bento from "./components/BentoDump";
import { numberToCOP } from "./constants/constants";
import toast from "react-simple-toasts";
import Login from "./components/Login";
import Admin from "./components/Admin";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriesSection, setIsFriesSection] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressModalActive, setIsAddressModalActive] = useState(false);
  const [isAddressSet, setIsAddressSet] = useState(false);
  const [address, setAddress] = useState({ direccion: "", optional: "" });
  const [activeProduct, setActiveProduct] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || false
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toogleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const changeAddressInfo = (e, type) => {
    setAddress((prev) => ({
      ...prev,
      ...(type === "optional"
        ? { optional: e.target.value }
        : { direccion: e.target.value }),
    }));
  };
  const validateAddress = () => {
    if (address.direccion.trim() === "") {
      toast("Campo requerido: dirección", {
        className: "my-toast-blue",
        position: "top-right",
      });
    } else if (address.direccion.length <= 6) {
      toast("¡Dirección no válida!", {
        className: "my-toast-blue",
        position: "top-right",
      });
    } else {
      toast("¡Dirección agregada con éxito!", {
        className: "my-toast",
        position: "top-right",
        duration: 1500,
      });
      setIsAddressModalActive(false);
      setIsAddressSet(true);
    }
  };
  const generateSale = () => {
    if (!isAddressSet)
      return toast("!Añade tu dirección!", {
        className: "my-toast",
        position: "top-right",
      });
    if (cart.length === 0)
      return toast("!Carrito vacío!", {
        className: "my-toast",
        position: "top-right",
      });
    let mensaje = "Hola! Quisiera hacer un pedido:\n\n";
    cart.forEach((producto) => {
      mensaje += `*${producto.nombre}*\n`;
      mensaje += `*Cantidad:* ${producto.cantidad}\n`;
      mensaje += `*Salsas:* ${
        producto.salsas ? producto.salsas.join(", ") : "No"
      }\n`;
      mensaje += `*Adiciones:* ${
        producto.adiciones
          ? producto.adiciones
              .map((adicion) => `${adicion.nombre} x ${adicion.cantidad}`)
              .join(",")
          : "Ninguna"
      }\n`;
      mensaje += `*Precio:* ${numberToCOP(producto.total)}\n`;
      mensaje += "------------------------------------\n";
    });
    mensaje += `*Dirección:* ${address.direccion} \n`;
    mensaje += `*Información adicional:* ${
      address.optional !== "" ? address.optional : "Ninguna"
    } \n`;
    mensaje += "------------------------------------\n";
    mensaje += `*Total del pedido:* ${numberToCOP(total)} COP.\n\n`;
    mensaje += "Por favor, confírmame la disponibilidad. ¡Gracias! 😊";
    const numero = "573103967137";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
    console.log(mensaje);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isAdmin", "true");
    setCurrentView("admin");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdmin");
    setCurrentView("home");
    refreshData();
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-data");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error refreshing data", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast("Tu navegador no soporta geolocalización.", {
        className: "my-toast-blue",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          if (data.display_name) {
            setAddress((prev) => ({ ...prev, direccion: data.display_name }));
            toast("¡Ubicación cargada!", {
              className: "my-toast",
              duration: 1500,
            });
          } else {
            setAddress((prev) => ({
              ...prev,
              direccion: `${latitude}, ${longitude}`,
            }));
          }
        } catch (error) {
          toast("Error al obtener dirección", { className: "my-toast-blue" });
          setAddress((prev) => ({
            ...prev,
            direccion: `${latitude}, ${longitude}`,
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        toast("Permiso de ubicación denegado.", { className: "my-toast-blue" });
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const removeItemCart = (id) => {
    setCart((prev) => prev.filter((product) => product.cartId !== id));
  };
  const openModal = (product) => {
    setIsModalOpen(true);
    setActiveProduct(product);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-data");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error loading data from API", error);
        // data will remain null or could be set to a safe empty object
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setTotal(
      cart.reduce((partialSum, product) => partialSum + product.total, 0)
    );
  }, [cart]);

  if (loading || !data) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <h2 className="text-white font-oswald text-3xl animate-pulse">
            {loading ? "CARGANDO..." : "CONECTANDO CON LA BASE DE DATOS..."}
        </h2>
      </div>
    );
  }

  if (currentView === "login") {
    return (
      <Login onLogin={handleLogin} onBack={() => setCurrentView("home")} />
    );
  }

  if (currentView === "admin") {
    if (!isLoggedIn) {
      setCurrentView("login");
      return null;
    }
    return (
      <Admin
        initialData={data}
        onLogout={handleLogout}
        onBack={() => {
            setCurrentView("home");
            refreshData();
        }}
      />
    );
  }

  return (
    <>
      <Header></Header>
      <main className="mt-20" id="menu">
        <h3 className="text-2xl font-pacifico font-bold text-center">
          Nuestra <span className="text-sky-high">Carta.</span>
        </h3>
        <div className="w-full mt-8 flex justify-center gap-8 h-24">
          <FloatButton
            onChange={() => setIsFriesSection(true)}
            title={"Mandingas"}
          >
            <img src="/fries.svg" className="w-8 h-8 " alt="papas" />
          </FloatButton>
          <FloatButton
            onChange={() => setIsFriesSection(false)}
            title={"Bebidas"}
          >
            <img src="/soda.svg" className="w-8 h-8 mr-1.5" alt="papas" />
          </FloatButton>
        </div>
        {isFriesSection ? (
          <CarrouselProducts openModal={openModal} products={data.mandingas} />
        ) : (
          <CarrouselProducts openModal={openModal} products={data.bebidas} />
        )}
        <Bento></Bento>
        <footer className="bg-black text-center font-black font-oswald text-gray-200 py-5">
          Made with ❤️ by Juano
          <button
            onClick={() => setCurrentView(isLoggedIn ? "admin" : "login")}
            className="text-gray-600 transition-colors duration-200 hover:text-sky-high block mx-auto mt-4 text-[10px] uppercase tracking-[0.4em] cursor-pointer"
          >
            Administración
          </button>
        </footer>
      </main>
      <button
        onClick={() => toogleCart()}
        className="fixed flex shadow-2xl shadow-black justify-center items-center bottom-6 z-[39] right-6 w-18 h-18 cursor-pointer hover:scale-110 hover:bg-amber-300 rounded-full bg-cheese text-white"
      >
        <Cart size={40}></Cart>
      </button>
      <Modal
        isFriesSection={isFriesSection}
        toogleModal={closeModal}
        activeProduct={activeProduct}
        isModalOpen={isModalOpen}
        setCart={setCart}
      ></Modal>
      <dialog
        className={`fixed transform ${
          isCartOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } flex justify-center items-center h-screen z-40 w-screen inset-0 bg-black/80`}
      >
        <article
          className={`w-[100%] lg:w-[45%] ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } transition-all duration-500 delay-100 h-screen ${
            isAddressModalActive ? "z-[49]" : "z-50"
          } overflow-auto absolute top-0 right-0 bg-white rounded-sm flex flex-col`}
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
                        .map(
                          (adicion) => `${adicion.nombre} x ${adicion.cantidad}`
                        )
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
                onClick={() => setIsAddressModalActive(true)}
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
        </article>
        <article
          className={`w-[100%] lg:w-[45%] transition-all duration-500 delay-100 h-screen ${
            isAddressModalActive
              ? "z-50 translate-x-0"
              : "z-[49] translate-x-full"
          } overflow-auto absolute top-0 right-0 bg-white rounded-sm flex flex-col`}
        >
          <div className="p-6 h-32 relative bg-linear-to-l text-white gap-2  from-cheese to-amber-400 items-center justify-center  flex ">
            <h2 className=" font-oswald font-black text-5xl tracking-tighter">
              Tu dirección
            </h2>
            <House size={60}></House>
            <button
              onClick={() => setIsAddressModalActive(false)}
              className="absolute z-50 transition-all duration-200 delay-75 hover:scale-105 cursor-pointer hover:text-red-600 text-white top-3 right-2.5 lg:right-4"
            >
              <Close size={30}></Close>
            </button>
          </div>
          <section className="flex h-full my-5 flex-col justify-center">
            <div className="flex grow mt-5 flex-col gap-14 p-4">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-oswald font-bold uppercase text-neutral-500 text-sm tracking-widest">
                    Ingresa tu dirección
                  </h3>
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="flex items-center gap-2 text-sky-high hover:text-sky-low font-bold text-sm cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Location size={20}></Location>
                    {isLocating ? "Obteniendo..." : "Usar ubicación actual"}
                  </button>
                </div>
                <input
                  type="text"
                  onChange={(e) => changeAddressInfo(e, "address")}
                  value={address?.direccion || ""}
                  placeholder="Ej: Cra 67A #10-9 Marinilla"
                  className="w-full border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-sky-high"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3>Información Adicional (Opcional)</h3>
                <input
                  onChange={(e) => changeAddressInfo(e, "optional")}
                  value={address?.optional || ""}
                  type="text"
                  placeholder="Ej: Por la panaderia de la dalía al fondo."
                  className="w-full border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-sky-high"
                />
              </div>
            </div>
            <button
              onClick={() => validateAddress()}
              className="w-[95%] bg-sky-high text-white pt-3 mb-10 lg:mb-3 pb-3 rounded-md font-semibold hover:bg-sky-low cursor-pointer transition-all self-center"
            >
              Agregar dirección
            </button>
          </section>
        </article>
      </dialog>
    </>
  );
}
export default App;
