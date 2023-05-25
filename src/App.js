import { Routes, Route , Navigate } from 'react-router-dom';
import { Calculator } from "./Calculator";
import { TestComponent } from './TestComponent';

function App() {


  return (

    <Routes>
      <Route path="/revcalc" element={ <Navigate to='/' replace={true}/>}> </Route>
      <Route path="/" element={<Calculator />}></Route>
      <Route path="/test" element={<TestComponent />}></Route>

    </Routes>

  );
}

export default App;
