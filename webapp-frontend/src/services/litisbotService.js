// src/services/litisbotService.js

// Para análisis de texto normal (no archivo):
export async function analizarTextoIA(consulta) {
  const url = "/api/analizar-texto";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consulta }),
  });
  if (!res.ok) throw new Error("Error en análisis IA");
  const data = await res.json();
  return data.respuesta || "No se obtuvo respuesta";
}

// **Agrega la función para analizar archivo**
export async function analizarArchivoPorLitisBot(url, nombre, tipo = "") {
  const endpoint = "/api/analizar-archivo"; // O tu endpoint real
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, nombre, tipo }),
  });
  if (!res.ok) throw new Error("Error analizando archivo");
  const data = await res.json();
  return data.resumen || "No se pudo obtener resumen del archivo.";
}
