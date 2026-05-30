import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import Purifiers from './pages/Purifiers';
import SparePartsPage from './pages/SparePartsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import WaterLoader from './components/WaterLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AppContent({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  // Trigger loading screen on route changes
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 600); // 600ms page load effect
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Hook into Axios requests to show loaders on forms and API fetches
  useEffect(() => {
    let activeRequests = 0;

    const reqInterceptor = axios.interceptors.request.use((config) => {
      activeRequests++;
      setApiLoading(true);
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const resInterceptor = axios.interceptors.response.use((response) => {
      activeRequests--;
      if (activeRequests <= 0) {
        setApiLoading(false);
      }
      return response;
    }, (error) => {
      activeRequests--;
      if (activeRequests <= 0) {
        setApiLoading(false);
      }
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const showLoader = isNavigating || apiLoading;

  return (
    <div className="min-h-screen bg-bg-light transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="pb-24 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/purifiers" element={<Purifiers isDarkMode={isDarkMode} />} />
          <Route path="/spare-parts" element={<SparePartsPage isDarkMode={isDarkMode} />} />
          <Route path="/purifier/:id" element={<ProductDetails isDarkMode={isDarkMode} type="purifier" />} />
          <Route path="/spare-part/:id" element={<ProductDetails isDarkMode={isDarkMode} type="spare-part" />} />
          <Route path="/about" element={<AboutUsPage isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<ContactUsPage isDarkMode={isDarkMode} />} />
          <Route path="/cart" element={<Cart isDarkMode={isDarkMode} />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
      {showLoader && <WaterLoader />}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <CartProvider>
      <Router>
        <ScrollToHash />
        <AppContent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </Router>
    </CartProvider>
  );
}

export default App;
