export default function FloatButton({ title, onChange, size, children }) {
  return (
    <button
      onClick={onChange}
      title={title}
      className={` w-12 h-12 flex justify-center items-center hover:scale-95 duration-400 transition-all bg-radial rounded-full to-sky-high via-sky-medium cursor-pointer shadow-sm inset-shadow-sky-high  from-sky-low`}
    >
      {children}
    </button>
  );
}
