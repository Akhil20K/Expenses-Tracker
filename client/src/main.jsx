import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();
// Provider - React Redux
// QueryClientProvider - React Query
// ReactQueryDevtools - For Query dev tools from tanstack, false by default
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }> 
      <QueryClientProvider client={ client }>
        <App />
        <ReactQueryDevtools initialIsOpen={ false }/>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
