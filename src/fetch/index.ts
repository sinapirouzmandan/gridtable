import {IGridData} from '../../types/gridData'


const calculateAverage = (values:number[]) => {
    const result = values.length > 0 
    ? values.reduce((a, b) => a + b, 0) / values.length 
    : 0;
    return result
}
const calculateSTD = (values:number[]) => {
    const result = values.length > 0 
    ? Math.sqrt(values.reduce((a, b) => a + Math.pow(b - calculateAverage(values), 2), 0) / values.length) 
    : 0;
    return result
}

export const fetchGridData = async () => {
  try {
    const response = await fetch(
      "https://run.mocky.io/v3/ce674906-f866-415d-9829-8e83f0d798bf"
    );
    const data: IGridData = await response.json();
    
    data.extras = [
      { key: 'average', title: "میانگین",values: [] },
      { key: 'stdDev',title: "انحراف معیار", values: [] },
    ];

    const columnCount = data.columns.length;
    const rowCount = data.rows.length;

    for (let colIndex = 0; colIndex < columnCount; colIndex++) {
      const columnValues: number[] = [];

      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const value = data.data[rowIndex][colIndex];
        if (value !== null) {
          columnValues.push(value);
        }
      }

      const nonNullValues = columnValues;
      const average: number = calculateAverage(nonNullValues)
      const stdDev: number = calculateSTD(nonNullValues)

      data.extras.find(extra => extra.key === 'average')?.values.push(average.toFixed(2));
      data.extras.find(extra => extra.key === 'stdDev')?.values.push(stdDev.toFixed(2));
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Some error occured. try again later.", error);
  }
};
