import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/global.scss';

function App() {
  const { t, i18n } = useTranslation();
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
    <>
      <div className=" h-full" style={{ height: '100vh' }}>
        <NavBar />
        <div
          onClick={() =>
            i18n.changeLanguage(i18n.language == 'ar' ? 'en' : 'ar')
          }
        ></div>
        <div>
          <h1 className=" text-center text-2xl my-5">
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
      </div>
    </>
  );
}

export default App;
