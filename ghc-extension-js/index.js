import express from "express";
import { Readable } from "node:stream";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { promises as fs } from "node:fs";

// Obter o diretório atual para ajudar a carregar arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cria um serviço web que escuta requisições recebidas
const app = express();

// Fornece um site básico se o usuário visitar a URL da extensão
app.get("/", (req, res) => {
  console.log("Endpoint chamado: /");
  res.sendFile(__dirname + "/info.html");
});
app.get("/info", (req, res) => {
  console.log("Endpoint chamado: /info");
  res.sendFile(__dirname + "/info.html");
});

// Após instalar o app, o GitHub irá redirecionar o usuário para esta URL
app.get("/callback", (req, res) => {
  console.log("Endpoint chamado: /callback");
  res.send("Sucesso! Você pode fechar esta janela e retornar ao GitHub.");
});

// Recebe requisições de chat, processa e retorna uma resposta
app.post("/copilot", express.json(), async (req, res) => {
  // Carrega o array de mensagens do payload da requisição
  const payload = req.body;
  const messages = payload.messages;

  // Adiciona a descrição do trabalho do agente às mensagens do copilot
  // const jobDescription = await fs.readFile(
  //   path.join(__dirname, "agent-knowledge", "job-description.md"),
  //   "utf8"
  // );
  // messages.unshift({
  //   role: "system",
  //   content: jobDescription,
  // });

  // Adiciona a visão geral da escola às mensagens do copilot
  // const schoolOverview = await fs.readFile(
  //   path.join(__dirname, "agent-knowledge", "school-overview.md"),
  //   "utf8"
  // );
  // messages.unshift({
  //   role: "system",
  //   content: schoolOverview,
  // });

  // Adiciona as descrições da equipe às mensagens do copilot
  // const staffDescriptions = await fs.readFile(
  //   path.join(__dirname, "agent-knowledge", "staff-roles.md"),
  //   "utf8"
  // );
  // messages.unshift({
  //   role: "system",
  //   content: staffDescriptions,
  // });

  // Envia o array de mensagens para o copilot e coleta a resposta
  const userToken = req.get("X-GitHub-Token");
  const copilotResponse = await fetch("https://api.githubcopilot.com/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${userToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messages,
      stream: true,
    }),
  });

  // Encaminha o stream de resposta de volta para o usuário
  Readable.from(copilotResponse.body).pipe(res);
});

// Inicia o serviço web da extensão e mostra a URL onde o serviço está rodando.
const port = Number(process.env.PORT || "3000");
app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const url = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
  console.log(`Serviço da extensão Copilot rodando em: ${url}`);
});
