import React, { useState } from "react";
import { IGridData } from "../../types/gridData";

const Grid: React.FC<IGridData> = ({ columns, rows, data, extras }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const getBackgroundColor = (
    value: number | null,
    rowIndex: number,
    colIndex: number
  ): string => {
    if (value === null) return "";
    if (
      hoveredRow !== null &&
      hoveredColumn === null &&
      rowIndex !== hoveredRow
    )
      return "";
    if (
      hoveredColumn !== null &&
      hoveredRow === null &&
      colIndex !== hoveredColumn
    )
      return "";

    if (value >= 0) {
      const opacity = (value * 6) / 100;
      return `rgba(51, 181, 89, ${opacity})`;
    } else {
      const opacity = (Math.abs(value) * 10) / 100;
      return `rgba(239, 95, 95, ${opacity})`;
    }
  };

  const toPersianNumeral = (en: number | string): string => {
    return ("" + en).replace(/[0-9]/g, function (t) {
      return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t + 1);
    });
  };

  const getExtraRowBackground = (index: number, value: any) => {
    if (index === 0) {
        if (value >= 0) {
            const opacity = (value * 6) / 100;
            return `rgba(51, 181, 89, ${opacity})`;
          } else {
            const opacity = (Math.abs(value) * 10) / 100;
            return `rgba(239, 95, 95, ${opacity})`;
          }
    }
    return "rgba(209, 213, 219, 0.4)"; 
  };

  return (
    <div className="overflow-x-auto rounded-lg text-[16px] pl-8 pr-8" dir="rtl">
      {data && columns.length > 0 && rows.length > 0 ? (
        <>
          <div
            className="grid border-t border-r border-l rounded-lg"
            style={{
              gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))`,
            }}
          >
            <div className="px-4 py-2 text-center mb-[16px] pr-4 pl-5 bg-gray-100">
              سال
            </div>
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="px-4 py-2 text-center mb-[16px] bg-gray-100"
                onMouseEnter={() => setHoveredColumn(colIndex)}
                onMouseLeave={() => setHoveredColumn(null)}
              >
                {col}
              </div>
            ))}

            {rows.map((year, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div
                  className="px-4 py-4 text-right ml-10 align-middle bg-white"
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {toPersianNumeral(year)}
                </div>
                {data[rowIndex]?.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="px-4 py-2 text-center m-2 rounded-md"
                    style={{
                      backgroundColor: getBackgroundColor(value, rowIndex, colIndex),
                    }}
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
            style={{
              gridTemplateColumns: `minmax(80px, 1fr) repeat(${columns.length}, minmax(80px, 1fr))`,
            }}
          >
            {extras?.map((extra, index) => (
              <React.Fragment key={extra.key}>
                <div
                  className="px-4 py-4 text-right ml-10 align-middle bg-white"
                >
                  {extra.title}
                </div>
                {extra.values.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="px-4 py-2 text-center m-2 rounded-md"
                    style={{
                      backgroundColor: getExtraRowBackground(index, value),
                    }}
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
