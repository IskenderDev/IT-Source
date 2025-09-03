// server.js  (ESM)
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
app.use(express.json());

const B24_BASE = "https://b24-ye7ag6.bitrix24.ru/rest/1/8d3b2wc1dtbncn2v"; // твой вебхук без метода
const PORT = Number(process.env.PORT) || 3000; // Timeweb часто прокидывает PORT

// API (оставляй как есть)
app.post("/api/b24-lead", async (req, res) => {
  try {
    const { name, email, message, utm = {}, page } = req.body || {};
    if (!name || !email) return res.status(400).json({ ok: false, error: "name и email обязательны" });

    const payload = {
      fields: {
        TITLE: `Website contact: ${name}`,
        NAME: name,
        EMAIL: [{ VALUE: String(email), VALUE_TYPE: "WORK" }],
        COMMENTS: message || "",
        SOURCE_ID: "WEB",
        UTM_SOURCE: utm.utm_source || "",
        UTM_MEDIUM: utm.utm_medium || "",
        UTM_CAMPAIGN: utm.utm_campaign || "",
        UTM_TERM: utm.utm_term || "",
        UTM_CONTENT: utm.utm_content || "",
        "UF_CRM_COMMENT_URL": page || "",
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    const r = await fetch(`${B24_BASE}/crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));

    if (!r.ok || data?.error) {
      return res.status(502).json({ ok: false, error: data?.error_description || data?.error || `HTTP ${r.status}` });
    }

    const leadId = data.result;
    const portal = B24_BASE.split("/rest/")[0];
    const leadUrl = `${portal}/crm/lead/details/${leadId}/`;
    res.json({ ok: true, leadId, leadUrl });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || "server_error" });
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));

app.listen(PORT, () => console.log(`✅ Server on :${PORT}`));
