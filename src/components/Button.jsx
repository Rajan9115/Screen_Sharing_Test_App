export default function Button({ children, onClick, disabled, variant = "primary" }) {
  const baseStyles = `
    px-6 py-3
    rounded-xl
    font-medium
    transition-all duration-200
    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} cursor-pointer ${variants[variant]}`}
    >
      {children}
    </button>
  );
}