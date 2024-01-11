import xlsx from "xlsx";
import _ from "lodash";

class SpreadSheetRepository {
  buscaDadosDoArquivo() {
    try {
      const workbook = xlsx.readFile("./files/modelo-teste-full-stack.xlsx", {
        type: "binary",
        cellDates: true,
        cellNF: false,
        cellText: false,
      });

      let workbook_sheet = workbook.SheetNames;

      const jsonOpts = {
        defval: "",
        blankrows: true,
        raw: false,
        dateNF: 'yyyy"/"mm"/"dd', //T"hh":"mm":"ss.00-0300"',
        // dateNF: 'yyyy"-"mm"-"dd"T00:00:00"', //T"hh":"mm":"ss.00-0300"',
      };

      const response = xlsx.utils
        .sheet_to_json(workbook.Sheets[workbook_sheet[0]], jsonOpts)
        .map((row) => _.mapKeys(row, (value, key) => _.camelCase(key.trim())));

      return response;
    } catch (e) {
      return [];
    }
  }
}

export default new SpreadSheetRepository();
