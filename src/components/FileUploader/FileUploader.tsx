import { url } from 'inspector';
import React from 'react';

function FileUploader(props: {
  value: File | File[];
  setFile: (value: File | File[]) => void;
  maxFiles?: number;
  multiple?: boolean;
}) {
  const { value, setFile, multiple = false, maxFiles = 1 } = props;
  const [imagePreview, SetImagePreview] = React.useState<string | string[]>([]);

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  function openFileWindow(
    onUpload: (payload: { file: File; base64: string }) => void
  ) {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];

      toBase64(file).then((base64: any) => {
        onUpload({
          file,
          base64,
        });
      });
    });
    fileInput.click();
  }

  const changeFile = (payload: { file: File; base64: string }) => {
    if (multiple && Array.isArray(value)) {
      const fileArray = [...value, payload.file];
      setFile(fileArray);
      SetImagePreview((prev) => [...prev, URL.createObjectURL(payload.file)]);
      return;
    } else {
      setFile(payload.file);
      SetImagePreview(URL.createObjectURL(payload.file));
    }
  };

  const checkMax = () => {
    if (Array.isArray(value)) {
      value.length < maxFiles ? openFileWindow(changeFile) : null;
    } else {
      openFileWindow(changeFile);
    }
  };

  return (
    <div className=" w-full bg-primary  gap-5  py-5  shadow-md rounded-md p-4 ">
      <h1
        className={` text-sm text-center ${
          Array.isArray(value) && value.length === maxFiles
            ? ''
            : ' cursor-pointer'
        } w-fit mx-auto  py-2 px-4 rounded-lg`}
        style={{
          backgroundColor: `${
            Array.isArray(value) && value.length === maxFiles
              ? 'rgba(255,255,255,0.30)'
              : 'rgba(255,255,255,1)'
          }`,
        }}
        onClick={checkMax}
      >
        {Array.isArray(value) && value.length === maxFiles
          ? 'Max files Limited'
          : 'Click to choose a file'}
      </h1>
      <div className="flex flex-wrap justify-start items-center gap-1 py-6">
        {!Array.isArray(imagePreview) && (
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.30)',
            }}
            className=" bg-white shadow-lg flex flex-col justify-center items-center p-5 flex-nowrap   rounded-md mx-auto"
          >
            {imagePreview && (
              <img
                src={imagePreview}
                className=" object-contain w-full"
                style={{ maxHeight: '120px' }}
              />
            )}
            {value && (
              <p className=" text-xs  whitespace-normal w-full text-center">
                {value.name.split('.')[0]}
              </p>
            )}
          </div>
        )}
        {Array.isArray(imagePreview) &&
          imagePreview.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.30)',
                }}
                className=" bg-white shadow-lg flex flex-col justify-center items-center p-5 flex-nowrap   overflow-hidden  rounded-md "
              >
                <img
                  src={item}
                  className=" object-contain w-full"
                  style={{ maxHeight: '120px' }}
                />
                <p className=" text-xs  whitespace-normal w-full text-center">
                  {value[index] && value[index].name.split('.')[0]}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FileUploader;
