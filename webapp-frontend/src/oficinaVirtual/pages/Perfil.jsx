export default function Perfil() {
  // Aquí puedes conectar con AuthContext para datos reales
  const usuario = {
    nombre: "Eduardo Frei Bruno Gómez",
    email: "eduardofreib@gmail.com",
    dni: "316670096",
    rol: "Abogado",
    registro: "2023-08-15"
  };
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">👤 Perfil de usuario</h2>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div><b>Nombre:</b> {usuario.nombre}</div>
        <div><b>Email:</b> {usuario.email}</div>
        <div><b>DNI:</b> {usuario.dni}</div>
        <div><b>Rol:</b> {usuario.rol}</div>
        <div><b>Miembro desde:</b> {usuario.registro}</div>
      </div>
      <div className="mt-6 text-gray-500 text-sm">Pronto: cambio de clave, foto, preferencias y logout.</div>
    </div>
  );
}
