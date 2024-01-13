import moment from "moment";
import { mesesAbreviados } from "./Consts.js";

export const obterDataFormatada = (data, formato = "DD/MM/YYYY") =>
  moment(data).format(formato);

export const obterMesAno = (data) => {
  const mesAno = mesesAbreviados[data.getMonth()] + "-" + data.getFullYear();
  return mesAno.toUpperCase();
};

export const extraiMes = (jsonObj, nomeDaColunaData, mes) => {
  const dados = agruparDadosPorNomeDaColunaData(jsonObj, nomeDaColunaData);
  let dadosCalculados = [];
  if (dados[mes] && dados[mes].length > 0) {
    let somaDosDados = 0;
    dados[mes].map((dado, index) => {
      somaDosDados += dado.valor;
    });
    dadosCalculados = somaDosDados;
  }
  return dadosCalculados;
};
