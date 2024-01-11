import moment from "moment";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const mesesAbreviados = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function filtraPorNomeDaColuna(jsonObj, nomeDaColuna, valor) {
  return jsonObj.filter((obj) => {
    return obj[nomeDaColuna] === valor;
  }, {});
}

export function somaValoresPorNomeDaColuna(jsonObj, nomeDaColuna) {
  return jsonObj.reduce((sum, col) => {
    return sum + col[nomeDaColuna];
  }, 0);
}

export function ordenaDadosPelaColuna(jsonObj, nomeDaColuna) {
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
}

export function extraiMes(jsonObj, nomeDaColunaData, mes) {
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
}

export function agruparDadosPorNomeDaColunaData(jsonObj, nomeDaColunaData) {
  const jsonObjSorted = ordenaDadosPelaColuna(jsonObj, nomeDaColunaData);
  const result = jsonObjSorted.reduce((acumulador, dados) => {
    const chave = dados[nomeDaColunaData];
    const data = new Date(chave);
    const mes1 = meses[data.getMonth()];
    const mes = obterDataFormatada(new Date(data.getFullYear(), data.getMonth(), 1, 0, 0, 0), 'YYYY-MM-DDT00:00:00');
    // const mes = data.toISOString();

    if (!acumulador[mes]) {
      acumulador[mes] = [];
    }
    acumulador[mes].push(dados);
    return acumulador;
  }, {});

  return result;
}

export function metricas(jsonObj, nomeDaColunaData) {
  const jsonObjFiltrado = agruparDadosPorNomeDaColunaData(
    jsonObj,
    nomeDaColunaData
  );

  const dadosResult = Object.keys(jsonObjFiltrado).map((key) => {
    let total = 0;
    let totalAtivos = 0;
    let totalCancelados = 0;
    jsonObjFiltrado[key].forEach((obj) => {
      total = total + eval(obj.valor);
      totalAtivos = totalAtivos + 1;
      if (obj.status === "Cancelada") {
        totalCancelados = totalCancelados + 1;
      }
    });

    return {
      Mes: key,
      Ativos: totalAtivos,
      Cancelados: totalCancelados,
      Total: total,
      PercentualCancelamento: (totalCancelados / totalAtivos) * 100,
    };
  });

  return dadosResult;
}

export const obterDataFormatada = (data, formato = "DD/MM/YYYY") =>
  moment(data).format(formato);

export default function Utils(params) {
  return null;
}
