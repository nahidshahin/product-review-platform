import Router from './routes/route';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar />        
        <div className="container mt-5">
          <Router />
        </div>
        <div className="container"> 
          <footer className="py-3 my-4"> 
            <ul className="nav justify-content-center border-bottom pb-3 mb-3"> 
              <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
              <li className="nav-item"><Link to="/products" className="nav-link px-2 text-body-secondary">Products</Link></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li> 
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li> 
            </ul> 
            <p className="text-center text-body-secondary">© 2025 My Company, Inc</p> 
          </footer> 
        </div>
        <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
