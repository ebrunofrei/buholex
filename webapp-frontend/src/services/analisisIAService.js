export async function analizarTextoConIA(texto, modo = "resumir") {
  const prompt =
    modo === "resumir"
      ? `Resume de forma profesional y clara este texto jurídico:\n\n${texto}`
      : texto;
  const resp = await fetch("/api/analizar-texto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto: prompt })
  });
  const data = await resp.json();
  return { resumen: data.resultado };
}

export async function traducirTextoConIA(texto, idioma = "español") {
  const prompt = `Traduce el siguiente texto al idioma ${idioma}:\n\n${texto}`;
  const resp = await fetch("/api/analizar-texto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto: prompt })
  });
  const data = await resp.json();
  return { traduccion: data.resultado };
}
