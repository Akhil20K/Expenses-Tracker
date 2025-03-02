import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    //! React Redux
    <Provider store={ store }> 
      //! React Query
      <QueryClientProvider client={ client }>
        <App />
        //! To load the query dev tools from Tanstack on the website
        <ReactQueryDevtools initialIsOpen={ false }/> //! Don't open the dev tools by default
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
