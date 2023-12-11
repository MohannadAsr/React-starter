import { useTranslation } from 'react-i18next';
import NavBar from './components/NavBar';
import './styles/global.scss';
import Carousel from '@components/Carousel/Carousel';
import React from 'react';
import FileUploader from '@components/FileUploader/FileUploader';
import { Pagination, usePagination } from './hooks/usePagination';

function App() {
  const { t, i18n } = useTranslation();
  const [image, setImage] = React.useState<File | File[]>([]);

  const { pagination: AppPagination, SetPagination: SetAppPagination } =
    usePagination();

  React.useEffect(() => {
    SetAppPagination((prev) => {
      return { ...prev, pageIndex: 2 };
    });
  }, []);

  return (
    <>
      <div>
        <NavBar />
        {AppPagination.pageIndex}
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
            className=" w-1/2 h-1/2 
          "
          >
            <Carousel
              slides={[
                ...Array.from({ length: 8 }).map(
                  (item, index) => `poster${index + 1}.jpg`
                ),
                'https://riskinfo.com.au/resource-centre/files/2019/11/test-img.jpg',
              ]}
              SlideView={6}
              key={1}
              imgSize="contain"
            />
            {/* {image && image?.name.split('.')[0]} */}
            {/* <FileUploader
              value={image}
              setFile={setImage}
              multiple
              maxFiles={2}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
