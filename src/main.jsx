import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query';
import 'antd/dist/reset.css';
import './index.css';
import { Spinner } from './components/spinner';
import 'react-quill/dist/quill.snow.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
