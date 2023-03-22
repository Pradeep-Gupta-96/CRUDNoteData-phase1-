
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import AddNotice from './Pages/AddNotice';
import UploadUsers from './Pages/UploadUsers';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/addnotice' element={<AddNotice/>}/>
          <Route path='/uploadusers' element={<UploadUsers/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
