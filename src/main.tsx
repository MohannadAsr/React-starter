import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import i18n from './plugins/i18n.ts'; // Import your i18n instance
import { I18nextProvider } from 'react-i18next';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
);
