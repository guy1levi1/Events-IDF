import "./App.css";
import ExcelTable from "./components/ExcelTable";
import Exec from "./components/Exec";
// import Temp from "./components/Temp";
import FullFeaturedCrudGrid from "./components/FullFeaturedCrudGrid";
import ExcelReader from "./ExcelReader"
import ParentComponent from "./ParentComponent"
function App() {
  return (
    <div className="App">
      {/* <ExcelTable></ExcelTable> */}
      <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
      {/* <Exec /> */}
      {/* <Temp /> */}
      {/* <ParentComponent></ParentComponent> */}
      
    </div>
  );
}

export default App;
