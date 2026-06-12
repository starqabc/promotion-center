const http = require("http");
const fs = require("fs");
const path = require("path");

const sessionId = "gift-button-click";
const host = "127.0.0.1";
const port = 7777;
const outdir = path.join(process.cwd(), ".dbg");
const logFile = path.join(outdir, `trae-debug-log-${sessionId}.ndjson`);
const envFile = path.join(outdir, `${sessionId}.env`);

fs.mkdirSync(outdir, { recursive: true });
fs.writeFileSync(logFile, "", "utf8");
fs.writeFileSync(envFile, `DEBUG_SERVER_URL=http://${host}:${port}/event\nDEBUG_SESSION_ID=${sessionId}\n`, "utf8");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", sessionId, logFile }));
  }
  if (req.method === "DELETE" && req.url === "/logs") {
    fs.writeFileSync(logFile, "", "utf8");
    res.writeHead(200);
    return res.end("ok");
  }
  if (req.method === "GET" && req.url.startsWith("/logs")) {
    const body = fs.existsSync(logFile) ? fs.readFileSync(logFile, "utf8") : "";
    res.writeHead(200, { "Content-Type": "application/json" });
    const rows = body.split(/\r?\n/).filter(Boolean).map((x) => {
      try { return JSON.parse(x); } catch { return null; }
    }).filter(Boolean);
    return res.end(JSON.stringify(rows));
  }
  if (req.method === "POST" && req.url === "/event") {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      try {
        const payload = JSON.parse(raw || "{}");
        if (!payload.ts) payload.ts = Date.now();
        fs.appendFileSync(logFile, JSON.stringify(payload) + "\n", "utf8");
        res.writeHead(200);
        res.end("ok");
      } catch (err) {
        res.writeHead(400);
        res.end(String(err && err.message ? err.message : err));
      }
    });
    return;
  }
  res.writeHead(404);
  res.end("not found");
});

server.listen(port, host, () => {
  const info = {
    base_url: `http://${host}:${port}`,
    api_url: `http://${host}:${port}/event`,
    session_id: sessionId,
    log_file: logFile,
    env_file: envFile
  };
  console.log("@@DEBUG_SERVER_INFO");
  console.log(JSON.stringify(info, null, 2));
  console.log("@@END_DEBUG_SERVER_INFO");
});
