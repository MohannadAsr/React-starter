import { useTranslation } from 'react-i18next';
import NavBar from './components/NavBar';
import './styles/global.scss';
import Carousel from '@components/Carousel/Carousel';
import React from 'react';

function App() {
  const { t, i18n } = useTranslation();
  const [imagee, setImagee] = React.useState<'fit' | 'cover' | 'contain'>(
    'contain'
  );
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
      <div>
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
        <div className=" h-screen bg-gray-100 flex justify-center items-center flex-col">
          <div
            className=" lg:h-3/4 lg:w-3/4 w-full 
          "
            onClick={() => {
              setImagee('cover');
            }}
          >
            <Carousel
              slides={[
                ...Array.from({ length: 8 }).map(
                  (item, index) => `poster${index + 1}.jpg`
                ),
                'https://riskinfo.com.au/resource-centre/files/2019/11/test-img.jpg',
              ]}
              SlideView={2}
              key={1}
              imgSize={imagee}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
