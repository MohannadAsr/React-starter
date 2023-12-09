import { Icon } from '@iconify/react/dist/iconify.js';
import arrowLeft from '@iconify-icons/mdi/arrow-left';
import arrowRight from '@iconify-icons/mdi/arrow-right';
import React from 'react';

type options = {
  slides: string[];
  SlideView: number;
  extraClasses?: string;
  imgSize?: 'contain' | 'fit' | 'cover';
};

function Carousel(options: options) {
  const optionsData = React.useMemo<options>(() => {
    return options;
  }, [options]);

  const refer = React.useRef<HTMLDivElement | null>();
  const scrollWidth = React.useMemo(() => {
    return refer.current?.scrollWidth;
  }, [refer]);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
      // Swipe right, perform action
      // Add your custom action here
      scroller('left');
    } else if (deltaX < -50) {
      // Swipe left, perform action
      // Add your custom action here
      scroller('right');
    }
  };

  const scroller = (type: 'left' | 'right') => {
    const scrollingDiv = refer.current;
    if (scrollingDiv) {
      type == 'right'
        ? (scrollingDiv.scrollLeft += scrollingDiv.offsetWidth + 0.5)
        : (scrollingDiv.scrollLeft -= scrollingDiv.offsetWidth + 0.5);
    }
  };

  return (
    <div className="h-full ">
      <div dir="ltr" className=" flex justify-start  gap-5 py-1 ">
        <button
          onClick={() => scroller('left')}
          className={` flex gap-1 items-center p-1 bg-primary  rounded-full   `}
        >
          <Icon icon={arrowLeft} fontSize={22} />
        </button>
        <button
          onClick={() => scroller('right')}
          className={` flex gap-1 items-center p-1 bg-primary  rounded-full   `}
        >
          <Icon icon={arrowRight} fontSize={22} />
        </button>
      </div>
      <div
        ref={refer}
        className={`overflow-x-hidden h-full overflow-y-hidden    flex scroll-smooth bg-black ${optionsData.extraClasses}   relative `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {optionsData.slides &&
          optionsData.slides.map((item, index) => {
            return (
              <img
                className={` ${
                  optionsData.imgSize
                    ? `object-${optionsData.imgSize}`
                    : 'object-cover'
                }   lg:w-1/2 sm:w-full  ${
                  optionsData.slides?.length == 1 && 'lg:w-full'
                }`}
                src={item.match(/https|https/) ? item : `/${item}`}
                key={index + 1}
              />
            );
          })}
        <img />

        <div
          className={` absolute ${
            scrollWidth ? `w-[${scrollWidth}px]` : 'w-0'
          } h-full   left-0 top-0  `}
          style={{ boxShadow: 'inset 0px -2px 11px 7px #121010db' }}
        ></div>
      </div>
    </div>
  );
}

export default Carousel;
