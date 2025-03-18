import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import ApiTable from "./ApiTable";
  import ValidateForm from "./ValidateForm";
 import ReactTable from "./ReactTable";


function App() {
  return (
  
  <Router>
     <Routes>
      <Route path="/" element={<ValidateForm/>} />
     <Route path='/next' element={<ReactTable/>} />
    <Route path='/view' element={<ApiTable/>} />
     </Routes>
   </Router>

  )
}

export default App;
