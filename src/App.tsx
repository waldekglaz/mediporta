import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Box } from "@mui/material";
import EnhancedTable from "./components/MainTable";
import Alert from "@mui/material/Alert";
import { TableContext } from "./context";
export type TOrder = "asc" | "desc";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [elementsPerPage, setElementsPerPage] = useState<number>(8);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.stackexchange.com/2.3/tags?&order=desc&sort=popular&site=stackoverflow`
        );
        setData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContext.Provider
      value={{ data, loading, elementsPerPage, setElementsPerPage }}
    >
      <Box component="section" sx={{ p: 8, margin: "0 auto", width: 320 }}>
        <TextField
          id="outlined-basic"
          label="Elements per page"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 1, max: data.length } }}
          value={elementsPerPage}
          onChange={(e) => setElementsPerPage(+e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />
        {error ? (
          <Alert severity="error">{error}.Please referesh the page</Alert>
        ) : (
          <EnhancedTable />
        )}
      </Box>
    </TableContext.Provider>
  );
}

export default App;
