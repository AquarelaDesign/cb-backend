import SpreadSheetRepository from "../repositories/SpreadSheetRepository.js";
import {
  agruparDadosPorNomeDaColunaData,
  filtraPorNomeDaColuna,
  metricas,
} from "../utils/Utils.js";

class SpreadSheet {
  todos(req, res) {
    try {
      const response = SpreadSheetRepository.buscaDadosDoArquivo();

      res.status(200).send({
        message: "",
        data: response,
      });
    } catch (e) {
      res.status(400).send({
        message: `Erro ao carregar o arquivo: ${e}`,
        data: "",
      });
    }
  }

  filtraDados(req, res) {
    const nomeDaColuna = req.body.nomeDaColuna;
    const valor = req.body.valor;

    try {
      const response = SpreadSheetRepository.buscaDadosDoArquivo();

      res.status(200).send({
        message: "",
        data: filtraPorNomeDaColuna(response, nomeDaColuna, valor),
      });
    } catch (e) {
      res.status(400).send({
        message: `Erro ao carregar o arquivo: ${e}`,
        data: "",
      });
    }
  }

  dadosAgrupadosPorData(req, res) {
    const nomeDaColunaData = req.body.nomeDaColuna;

    try {
      const response = SpreadSheetRepository.buscaDadosDoArquivo();

      res.status(200).send({
        message: "",
        data: agruparDadosPorNomeDaColunaData(response, nomeDaColunaData),
      });
    } catch (e) {
      res.status(400).send({
        message: `Erro ao carregar o arquivo: ${e}`,
        data: "",
      });
    }
  }

  metricas(req, res) {
    const nomeDaColunaData = req.body.nomeDaColuna;

    try {
      const response = SpreadSheetRepository.buscaDadosDoArquivo();
      const retorno = metricas(response, nomeDaColunaData);

      // console.log(retorno);

      res.status(200).send({
        message: "",
        data: retorno,
      });
    } catch (e) {
      res.status(400).send({
        message: `Erro ao carregar o arquivo: ${e}`,
        data: "",
      });
    }
  }
}

export default new SpreadSheet();
