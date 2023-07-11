import ThemeDefault from '@/themes/default';
import { ThemeProvider } from './themes/default/context/ThemeContext';
import { MainProvider } from '@/providers/Main';
import { ProductProvider } from './providers/Product';
import { OrderProvider } from './providers/Order';
import '@/App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ProductProvider>
      <OrderProvider>
        <ThemeProvider>
          <MainProvider>
            <ThemeDefault>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Outlet />
            </ThemeDefault>
          </MainProvider>
        </ThemeProvider>
      </OrderProvider>
    </ProductProvider>
  );
}

export default App;
