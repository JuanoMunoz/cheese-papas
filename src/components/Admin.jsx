/*
Este archivo contiene la lógica del panel administrativo. 
Permite visualizar, añadir y eliminar elementos de las categorías: mandingas, bebidas, adiciones y salsas.
Incluye la funcionalidad de persistencia física mediante una llamada al endpoint /api/save-data.
*/
import { useState } from "react";
import { Trash, House, Edit } from "./SVG";
import toast from "react-simple-toasts";

const Admin = ({ initialData, onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState("mandingas");
  const [data, setData] = useState(initialData);

  const saveToDisk = async () => {
    try {
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast("¡Cambios guardados con éxito!", { 
          className: "my-toast", 
          position: "top-right",
          duration: 2000
        });
      } else {
        throw new Error("Error al guardar");
      }
    } catch (error) {
      toast("Error al guardar los cambios", { 
        className: "my-toast-blue", 
        position: "top-right" 
      });
    }
  };

  const addItem = (category, newItem) => {
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], newItem],
    }));
    toast("Elemento añadido localmente", { duration: 1000, position: "bottom-center"});
  };

  const updateItem = (category, updatedItem) => {
    setData((prev) => {
      if (category === "salsas") {
        const newSalsas = [...prev.salsas];
        newSalsas[updatedItem.index] = updatedItem.nombre;
        return { ...prev, salsas: newSalsas };
      }
      return {
        ...prev,
        [category]: prev[category].map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      };
    });
    toast("Elemento actualizado localmente", {
      duration: 1000,
      position: "bottom-center",
    });
  };

  const removeItem = (category, id) => {
    setData((prev) => {
        if (category === 'salsas') {
            return {
                ...prev,
                salsas: prev.salsas.filter((_, index) => index !== id)
            }
        }
        return {
            ...prev,
            [category]: prev[category].filter((item) => item.id !== id),
        }
    });
    toast("Elemento eliminado localmente", { duration: 1000, position: "bottom-center"});
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans">
       {/* Header Admin */}
       <header className="bg-black text-white p-5 shadow-2xl flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="bg-cheese p-2 rounded-lg">
             <House size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-oswald font-black uppercase tracking-tighter">Panel <span className="text-cheese">Admin</span></h1>
        </div>
        <div className="flex gap-3">
           <button onClick={onBack} className="bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-neutral-700">Tienda</button>
           <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-red-900/20">Cerrar Sesión</button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden mb-8 p-1">
          {["mandingas", "bebidas", "adiciones", "salsas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-4 text-xs font-oswald font-black uppercase tracking-[0.2em] transition-all cursor-pointer rounded-xl ${
                activeTab === tab ? "bg-cheese text-white shadow-lg" : "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content area */}
        <section className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-8 mb-24 anim-fade-in">
           <AdminCategory
            category={activeTab}
            items={data[activeTab]}
            onAdd={(newItem) => addItem(activeTab, newItem)}
            onUpdate={(updatedItem) => updateItem(activeTab, updatedItem)}
            onRemove={(id) => removeItem(activeTab, id)}
          />
        </section>

        {/* Save Floating Button */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-20">
           <button
            onClick={saveToDisk}
            className="pointer-events-auto bg-sky-high hover:bg-sky-low text-white px-10 py-5 rounded-2xl font-black font-oswald uppercase tracking-widest shadow-2xl shadow-sky-900/40 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 border-b-4 border-sky-900"
          >
            Guardar Cambios permanentemente
          </button>
        </div>
      </main>

      <style>{`
        .anim-fade-in {
            animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const AdminCategory = ({ category, items, onAdd, onUpdate, onRemove }) => {
    const [newItem, setNewItem] = useState({});
    const [editingItem, setEditingItem] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const uploadImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                try {
                    const base64 = reader.result;
                    const response = await fetch("/api/upload-image", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ filename: file.name, base64 })
                    });
                    const result = await response.json();
                    if (response.ok) {
                        resolve(result.path);
                    } else {
                        throw new Error(result.error);
                    }
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleStartEdit = (item, index) => {
        if (category === 'salsas') {
            setNewItem({ nombre: item, index });
            setEditingItem({ index });
        } else {
            setNewItem({ ...item });
            setEditingItem({ id: item.id });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        
        let finalImg = newItem.img;

        if (selectedFile) {
            try {
                toast("Subiendo imagen...", { duration: 1500 });
                finalImg = await uploadImage(selectedFile);
            } catch (error) {
                toast("Error al subir imagen", { className: "my-toast-blue" });
                return;
            }
        }

        if (category === 'salsas') {
            if (editingItem) {
                onUpdate({ nombre: newItem.nombre, index: editingItem.index });
            } else {
                onAdd(newItem.nombre);
            }
        } else {
            if (editingItem) {
                onUpdate({ ...newItem, img: finalImg });
            } else {
                const nextId = items.length > 0 ? Math.max(...items.map(i => i.id || 0)) + 1 : 1;
                onAdd({ ...newItem, id: nextId, precio: Number(newItem.precio), img: finalImg });
            }
        }
        setNewItem({});
        setEditingItem(null);
        setSelectedFile(null);
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end border-b border-neutral-100 pb-5">
                <h2 className="text-4xl font-pacifico text-cheese capitalize">{category}</h2>
                <span className="text-neutral-400 font-oswald font-bold text-sm uppercase tracking-widest">{items.length} elementos</span>
            </div>

            {/* Form to add */}
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-neutral-50 p-8 rounded-2xl border border-neutral-200 shadow-inner">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Nombre</label>
                    <input
                        placeholder={category === 'salsas' ? "Ej: Mostaza" : "Ej: Papa especial"}
                        className="p-3 bg-white border border-neutral-200 rounded-xl font-oswald outline-none focus:ring-2 focus:ring-sky-high/20 focus:border-sky-high transition-all"
                        value={newItem.nombre || ''}
                        onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
                        required
                    />
                </div>
                {category !== 'salsas' && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Precio</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="p-3 bg-white border border-neutral-200 rounded-xl font-oswald outline-none focus:ring-2 focus:ring-sky-high/20 focus:border-sky-high transition-all"
                            value={newItem.precio || ''}
                            onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
                            required
                        />
                    </div>
                )}
                {(category === 'mandingas') && (
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Descripción</label>
                        <input
                            placeholder="Contenido del plato..."
                            className="p-3 bg-white border border-neutral-200 rounded-xl font-oswald outline-none focus:ring-2 focus:ring-sky-high/20 focus:border-sky-high transition-all"
                            value={newItem.descripcion || ''}
                            onChange={(e) => setNewItem({ ...newItem, descripcion: e.target.value })}
                            required
                        />
                    </div>
                )}
                 {(category === 'mandingas' || category === 'bebidas') && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Imagen del Producto</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="p-2.5 bg-white border border-neutral-200 rounded-xl font-oswald outline-none focus:ring-2 focus:ring-sky-high/20 focus:border-sky-high transition-all text-xs"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            required={!editingItem}
                        />
                         {editingItem && newItem.img && (
                            <p className="text-[9px] text-neutral-400 mt-1 truncate">Archivo actual: {newItem.img}</p>
                        )}
                    </div>
                )}
                <div className="flex flex-col gap-2 items-end justify-end">
                    {editingItem && (
                         <button 
                            type="button"
                            onClick={() => { setEditingItem(null); setNewItem({}); }}
                            className="w-full bg-neutral-200 text-neutral-600 font-bold p-2 rounded-xl hover:bg-neutral-300 cursor-pointer font-oswald uppercase tracking-widest transition-all mb-2"
                        >
                            Cancelar
                        </button>
                    )}
                    <button type="submit" className={`w-full ${editingItem ? 'bg-cheese' : 'bg-black'} text-white font-black p-4 rounded-xl hover:opacity-90 cursor-pointer font-oswald uppercase tracking-widest shadow-lg shadow-black/10 transition-all active:scale-95`}>
                        {editingItem ? 'Actualizar' : 'Añadir'}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 gap-4">
                {items.map((item, index) => (
                    <div key={item.id || index} className="p-4 bg-white border border-neutral-100 rounded-2xl flex justify-between items-center group hover:bg-neutral-50 transition-all hover:shadow-md hover:border-neutral-200">
                        <div className="flex items-center gap-5">
                            {(item.img) ? (
                                <div className="relative">
                                    <img src={item.img} className="w-16 h-16 object-cover rounded-xl shadow-sm border border-neutral-100" />
                                    <div className="absolute inset-0 rounded-xl bg-black/5"></div>
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-300 font-black font-oswald">TEXT</div>
                            )}
                            <div>
                                <p className="font-black text-neutral-800 font-oswald text-lg uppercase tracking-tight">{category === 'salsas' ? item : item.nombre}</p>
                                {item.precio !== undefined && <p className="text-cheese font-black font-oswald">$ {item.precio.toLocaleString()}</p>}
                                {item.descripcion && <p className="text-xs text-neutral-400 max-w-lg mt-1 leading-relaxed">{item.descripcion}</p>}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleStartEdit(item, index)} className="p-3 text-neutral-200 hover:text-sky-high hover:bg-sky-50 rounded-xl transition-all cursor-pointer">
                                <Edit size={28} />
                            </button>
                            <button onClick={() => onRemove(item.id || index)} className="p-3 text-neutral-200 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                                <Trash size={28} />
                            </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-neutral-100 rounded-3xl">
                        <p className="font-oswald font-black text-neutral-200 uppercase tracking-widest text-2xl">Sin elementos</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin;
