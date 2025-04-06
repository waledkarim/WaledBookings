import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools  } from "react-query/devtools"
import { AppContextProvider } from './contexts/AppContext.tsx'
import { SearchContextProvider } from './contexts/SearchContext.tsx'
import SpecialContainer from './components/SpecialContainer.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <SearchContextProvider>
        <App />
        <SpecialContainer />
      </SearchContextProvider>
    </AppContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  
)
