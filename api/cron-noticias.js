import run from "../jobs/cronNoticias.js"; // tu job export default

export default async function handler(req, res) {
  try {
    await run();
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e?.message || "Cron error" });
  }
}
