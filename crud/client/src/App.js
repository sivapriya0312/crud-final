import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Index from './Components/Index';
import Add from './Components/Add';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Add" element={<Add />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
