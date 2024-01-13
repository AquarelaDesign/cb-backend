import { meses } from "./Consts.js";
import { obterDataFormatada } from "./UtilsDates.js";

export const filtraPorNomeDaColuna = (jsonObj, nomeDaColuna, valor) => {
  return jsonObj.filter((obj) => {
    return obj[nomeDaColuna] === valor;
  }, {});
};

export const somaValoresPorNomeDaColuna = (jsonObj, nomeDaColuna) => {
  return jsonObj.reduce((sum, col) => {
    return sum + eval(col[nomeDaColuna]);
  }, 0);
};

export const ordenaDadosPelaColuna = (jsonObj, nomeDaColuna) => {
  return jsonObj.reduce((sorted, el) => {
    let index = 0;
    while (
      index < sorted.length &&
      el[nomeDaColuna] >= sorted[index][nomeDaColuna]
    )
      index++;
    sorted.splice(index, 0, el);
    return sorted;
  }, []);
};

export const agruparDadosPorNomeDaColunaData = (jsonObj, nomeDaColunaData) => {
  const jsonObjSorted = ordenaDadosPelaColuna(jsonObj, nomeDaColunaData);
  const result = jsonObjSorted.reduce((acumulador, dados) => {
    const chave = dados[nomeDaColunaData];
    const data = new Date(chave);
    const mes1 = meses[data.getMonth()];
    const mes = obterDataFormatada(
      new Date(data.getFullYear(), data.getMonth(), 1, 0, 0, 0),
      "YYYY-MM-DDT00:00:00"
    );

    if (!acumulador[mes]) {
      acumulador[mes] = [];
    }
    acumulador[mes].push(dados);
    return acumulador;
  }, {});

  return result;
};

export const filtraValoresUnicos = (jsonObj, nomeDaColuna) => {
  const dados = [];
  jsonObj.reduce((variant, col) => {
    dados.push(col[nomeDaColuna]);
  }, []);
  return [...new Set(dados)];
};
