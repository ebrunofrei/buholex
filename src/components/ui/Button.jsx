// src/components/ui/Button.jsx
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
    >
      {children}
    </button>
  );
}
