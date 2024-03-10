export function Button({ children, ...props }) {
  return (
    <button
      className="m-2 flex w-full  items-center justify-center rounded-lg bg-slate-900 px-3.5 py-5 text-center text-sm font-semibold text-white hover:cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
