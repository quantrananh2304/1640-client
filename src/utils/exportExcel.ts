import _ from "lodash";
import * as XLSX from "xlsx-js-style";
import { format } from "date-fns";

export const getExcelData = (
  {
    columns,
    ignoreFields,
  }: { columns: Array<any>; ignoreFields: Array<string> } = {
    columns: [{ field: "" }],
    ignoreFields: [""],
  },
  data: Array<any> = []
) => {
  const keys: Array<any> = columns
    .filter((column) => !ignoreFields.includes(column.field))
    .map((column) => ({ headerName: column.headerName, field: column.field }));
  const dataSource = data.map((item: any) => {
    const values: any = {};
    keys.forEach((key) => {
      values[key.headerName] = item[key.field];
    });

    return values;
  });

  return dataSource;
};

export const exportToCSV = (
  _csvData: any,
  _fileName: string,
  timeStamp: boolean = false
) => {
  if (_csvData) {
    let header: any = [];
    let maxLengthArr: Array<number> = [];

    for (const key in _csvData[0]) {
      header.push({ v: key, t: "s", s: { font: { bold: true } } });
      maxLengthArr.push(key.toString().length);
    }

    const excelData = _csvData.map((item: any) => {
      let row: Array<any> = [];

      for (const key in item) {
        const value: string = _.isArray(item[key])
          ? item[key].join(",")
          : ![undefined, null, NaN].includes(item[key])
          ? item[key].toString()
          : "";

        row.push(value);

        const rowLength: number = row.length;
        const maxLength: number = maxLengthArr[rowLength - 1];
        const currentLength: number = value.length || 0;

        if (Number(currentLength) > Number(maxLength)) {
          maxLengthArr[rowLength - 1] = currentLength;
        }
      }

      return row;
    });

    const ws = XLSX.utils.aoa_to_sheet([header, ...excelData]);
    const cols = maxLengthArr.map((item: any) => {
      const wpx: number = item;
      return { wch: wpx };
    });

    ws["!cols"] = cols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(
      wb,
      `${
        _fileName + (timeStamp ? "_" + format(new Date(), "yyyy-MM-dd") : "")
      }.xlsx`,
      { bookType: "xlsx", type: "buffer" }
    );
  } else {
    return;
  }
};
