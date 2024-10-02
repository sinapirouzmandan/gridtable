import React, { useState } from "react";
import { IGridData } from "../../types/gridData";

const Grid: React.FC<IGridData> = ({ columns, rows, data, extras }) => {
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
              >
                {col}
              </div>
            ))}

            {rows.map((year, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div
                  className="px-4 py-4 text-right ml-10 align-middle bg-white"
    
                >
                  {year}
                </div>
                {data[rowIndex]?.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="px-4 py-2 text-center m-2 rounded-md"
                  >
                    {value !== null ? value + "%" : "-"}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>


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
       
                  >
                    {value !== null ? value + "%" : "-"}
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
