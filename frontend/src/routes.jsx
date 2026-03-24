import { createBrowserRouter } from 'react-router-dom';
import PaymentPage from './features/payments/PaymentPage';
import ReportPage from './features/reports/ReportPage';
import ResultPage from './features/payments/ResultPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PaymentPage />
  },
  {
    path: '/report',
    element: <ReportPage />
  },
  {
    path: '/result',
    element: <ResultPage />
  },
  {
    path: '*',
    element: <PaymentPage />
  }
]);
