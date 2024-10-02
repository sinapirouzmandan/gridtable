import React, { useState } from "react";
import { IGridData } from "../../types/gridData";

const Grid: React.FC<IGridData> = ({ columns, rows, data, extras }) => {
  const [hovered, setHovered] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });

  const getBackgroundColor = (value: number | null, rowIndex: number, colIndex: number): string => {
    if (value === null || (hovered.row !== null && hovered.row !== rowIndex) || (hovered.col !== null && hovered.col !== colIndex)) 
      return "";
    
    const opacity = value >= 0 ? (value * 6) / 100 : (Math.abs(value) * 10) / 100;
    return `rgba(${value >= 0 ? "51, 181, 89" : "239, 95, 95"}, ${opacity})`;
  };

  const toPersianNumeral = (num: number | string): string =>
    ("" + num).replace(/[0-9]/g, (t) => "٠١٢٣٤٥٦٧٨٩"[+t]);

  const getExtraRowBackground = (index: number, value: number) => {
    const opacity = value >= 0 ? (value * 6) / 100 : (Math.abs(value) * 10) / 100;
    return index === 0 ? `rgba(${value >= 0 ? "51, 181, 89" : "239, 95, 95"}, ${opacity})` : "rgba(209, 213, 219, 0.4)";
  };

  return (
    <div className="overflow-x-auto rounded-lg text-[16px] pl-8 pr-8" dir="rtl">
      {data && columns.length && rows.length ? (
        <>
          <div
            className="grid border-t border-r border-l rounded-lg"
            style={{ gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))` }}
          >
            <div className="px-4 py-2 text-center mb-[16px] pr-4 pl-5 bg-gray-100">سال</div>
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="px-4 py-2 text-center mb-[16px] bg-gray-100"
                onMouseEnter={() => setHovered({ ...hovered, col: colIndex })}
                onMouseLeave={() => setHovered({ ...hovered, col: null })}
              >
                {col}
              </div>
            ))}

            {rows.map((year, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div
                  className="px-4 py-4 text-right ml-10 align-middle bg-white"
                  onMouseEnter={() => setHovered({ ...hovered, row: rowIndex })}
                  onMouseLeave={() => setHovered({ ...hovered, row: null })}
                >
                  {toPersianNumeral(year)}
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

          <div className="my-4 border-t border-gray-300 opacity-50"></div>

          <div
            className="grid border-r border-l border-b rounded-lg"
            style={{ gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))` }}
          >
            {extras?.map((extra, index) => (
              <React.Fragment key={extra.key}>
                <div className="px-4 py-4 text-right ml-10 align-middle bg-white">{extra.title}</div>
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
        </>
      ) : (
        <p className="p-4">Loading...</p>
      )}
    </div>
  );
};

export default Grid;
