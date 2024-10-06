import React, { useState } from "react";
import { IGridData } from "../../types/gridData";

const Grid: React.FC<IGridData> = ({ columns, rows, data, extras }) => {
  const [hovered, setHovered] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });

  const getBackgroundColor = (value: number | null, rowIndex: number, colIndex: number): string => {
    if (value === null || (hovered.row !== null && hovered.row !== rowIndex) || (hovered.col !== null && hovered.col !== colIndex)) 
      return "";
    
    const opacity = value >= 0 ? (value * 6) / 100 : (Math.abs(value) * 10) / 100;
    return `rgba(${value >= 0 ? "0, 100, 0" : "210,0,0"}, ${opacity})`;
  };

  const toPersianNumeral = (num: number): string =>
  {
  num = Math.floor(num)
   return ("" + num).replace(/[0-9]/g, (t) => "٠١٢٣٤٥٦٧٨٩"[+t]);

  }

  const getExtraRowBackground = (index: number, value: number) => {
    const opacity = value >= 0 ? (value * 6) / 100 : (Math.abs(value) * 10) / 100;
    return index === 0 ? `rgba(${value >= 0 ? "0, 100, 0" : "210,0, 0"}, ${opacity})` : "rgba(209, 213, 219, 0.4)";
  };

  return (
    <div className="overflow-x-auto rounded-lg text-[16px] pl-8 pr-8" dir="rtl">
      {data && columns.length && rows.length ? (
        <>
         <div
            className="grid rounded-lg overflow-hidden mb-4"
            style={{ gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))` }}
          >
           <div className="px-4 py-2 text-center pr-4 pl-8 bg-gray-100">سال</div>
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="px-4 py-2 text-center bg-gray-100"
                onMouseEnter={() => setHovered({ ...hovered, col: colIndex })}
                onMouseLeave={() => setHovered({ ...hovered, col: null })}
              >
                {col}
              </div>
              
            ))}
            </div>
            <div className="border-[1.6px] rounded-lg overflow-hidden">
            <div
            className="grid pt-4"
            style={{ gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))` }}
          >
        

            {rows.map((year, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div
                  className="px-4 py-4 text-right ml-10 align-middle bg-white"
                  onMouseEnter={() => setHovered({ ...hovered, row: rowIndex })}
                  onMouseLeave={() => setHovered({ ...hovered, row: null })}
                >
                  {toPersianNumeral(Number(year))}
                </div>
                {data[rowIndex]?.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="px-4 py-2 text-center m-2 rounded-md"
                    style={{ backgroundColor: getBackgroundColor(value, rowIndex, colIndex) }}
                  >
                    {value !== null ? toPersianNumeral(value) + "%" : "-"}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="my-4 border-[1.5px] opacity-90 w-[98%] mr-auto ml-auto"></div>

          <div
            className="grid pb-4"
            style={{ gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))` }}
          >
            {extras?.map((extra, index) => (
              <React.Fragment key={extra.key}>
                <div className="text-right align-middle bg-white pr-4 py-4">{extra.title}</div>
                {extra.values.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="px-4 py-2 text-center m-2 rounded-md"
                    style={{ backgroundColor: getExtraRowBackground(index, value) }}
                  >
                    {value !== null ? toPersianNumeral(value) + "%" : "-"}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
            </div>

        </>
      ) : (
        <p className="p-4">Loading...</p>
      )}
    </div>
  );
};

export default Grid;
