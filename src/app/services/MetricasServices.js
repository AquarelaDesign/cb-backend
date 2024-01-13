import _ from "lodash";

import {
  agruparDadosPorNomeDaColunaData,
  filtraValoresUnicos,
} from "../utils/UtilsFiles.js";

export const metricas = (jsonObj, nomeDaColunaData) => {
  const jsonObjFiltrado = agruparDadosPorNomeDaColunaData(
    jsonObj,
    nomeDaColunaData
  );

  const statusUnicos = filtraValoresUnicos(jsonObj, "status");

  const dadosResult = Object.keys(jsonObjFiltrado).map((key) => {
    let totais = {};
    jsonObjFiltrado[key].forEach((obj) => {
      if (!totais["mes"]) totais["Mes"] = key;
      if (!totais["total"]) totais["total"] = 0;
      if (!totais["mrr"]) totais["mrr"] = 0;

      if (!totais["Mensal"]) totais["Mensal"] = 0;
      if (!totais["MensalValor"]) totais["MensalValor"] = 0;
      if (!totais["MensalValorMedio"]) totais["MensalValorMedio"] = 0;
      if (!totais["Anual"]) totais["Anual"] = 0;
      if (!totais["AnualValor"]) totais["AnualValor"] = 0;
      if (!totais["AnualValorMedio"]) totais["AnualValorMedio"] = 0;

      for (let i = 0; i < statusUnicos.length; i++) {
        const statusUnicosFormatado = _.camelCase(statusUnicos[i].trim());
        if (!totais["totalValor"]) totais["totalValor"] = 0;
        if (!totais[statusUnicosFormatado]) totais[statusUnicosFormatado] = 0;
        if (!totais[statusUnicosFormatado + "Valor"])
          totais[statusUnicosFormatado + "Valor"] = 0;
        if (obj.status === statusUnicos[i]) {
          totais[statusUnicosFormatado]++;
          totais[statusUnicosFormatado + "Valor"] += eval(obj.valor);
          totais["total"]++;
          totais["totalValor"] += eval(obj.valor);
        }
      }

      if (obj.periodicidade === "Mensal") {
        totais["Mensal"]++;
        totais["MensalValor"] += eval(obj.valor);
      }
      if (obj.periodicidade === "Anual") {
        totais["Anual"]++;
        totais["AnualValor"] += eval(obj.valor);
      }
    });

    totais["MensalValorMedio"] = totais["MensalValor"] / totais["Mensal"];
    totais["AnualValorMedio"] = totais["AnualValor"] / totais["Anual"] / 12;

    // MRR = Média recebida x total de clientes.
    totais["mrr"] = totais["MensalValorMedio"] * totais["ativa"];
    // Churn Rate: total de clientes cancelados / número total de clientes ativos do último mês
    totais["churn"] = totais["cancelada"] / totais["ativa"]; //<- Buscar ativos do mês anterior

    return totais;
  });

  return dadosResult;
};
