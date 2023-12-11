import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/global.scss';
import { useAppContext } from './App/AppProvider';

function App() {
  const { t, i18n } = useTranslation();
  const { AppStore, AppDispatch } = useAppContext();

  const router = [
    {
      path: '/',
      element: <div></div>,
    },
    {
      path: 'contactus:id',
      element: <NavBar />,
    },
  ];

  return (
    <div className=" h-full" style={{ height: '100vh' }}>
      <NavBar />
      <div
        onClick={() => i18n.changeLanguage(i18n.language == 'ar' ? 'en' : 'ar')}
      ></div>
      <div>
        <h1 className=" dark:bg-black dark:text-white text-center text-2xl my-5">
          {t('Welcome to React')}
        </h1>
      </div>
      <Routes>
        {router.map((item) => {
          return (
            <Route
              path={item.path}
              element={item.element}
              key={Math.random()}
            />
          );
        })}
        <Route path="contactus" element={<NavBar />}>
          <Route path=":id" />
        </Route>
      </Routes>
      <span
        onClick={() =>
          AppDispatch({
            type: 'SwitchMode',
            payload: AppStore.mode === 'dark' ? 'light' : 'dark',
          })
        }
      >
        {AppStore.mode}
      </span>
    </div>
  );
}

export default App;
