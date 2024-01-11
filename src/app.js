import express from "express";
import cors from "cors";
import SpreadSheet from "./app/controllers/SpreadSheetController.js";

const app = express();

app.use(express.json());
app.use(cors());


app.get("/api/v01/todos", SpreadSheet.todos);
app.post("/api/v01/filtraDados", SpreadSheet.filtraDados);
app.post("/api/v01/agruparDados", SpreadSheet.dadosAgrupadosPorData);
app.post("/api/v01/metricas", SpreadSheet.metricas);

export default app;
