import app from "./src/app.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta: ${PORT}`);
});
