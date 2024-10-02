import { useEffect, useState } from "react";
import { IGridData } from "../types/gridData";
import { fetchGridData } from "./fetch";
import Grid from './components/Grid'
function App() {
  const [gridData, setGridData] = useState<IGridData>({
    columns: [],
    rows: [],
    data: [],
    extras: []
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IGridData | undefined = await fetchGridData();
        if (data) {
          setGridData(data);
        } else {
          throw new Error("No response from API.");
        }
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App m-7">
      <h1 className="text-center text-4xl">Grid task</h1>
      <h6 className="text-center">sina pirouzmandan</h6>

        <div className="mt-5 flex justify-center">
          <Grid columns={gridData.columns} rows={gridData.rows} data={gridData.data} extras={gridData.extras} />
        </div>
    </div>
  )
}

export default App
