import 'swiper/css';
import 'swiper/css/pagination';
// Carousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import styles from './PromoCarousel.module.css';

export default function Carousel({ promoList = [] }) {
  return (
    <Swiper
      className={styles.swiper}
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop={promoList.length > 1}
      spaceBetween={30}
      autoHeight={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {promoList.map((item, i) => {
        const src = typeof item === 'string' ? item : item.img;
        const alt = (typeof item === 'object' && item.alt) ? item.alt : `banner-${i}`;
        return (
          <SwiperSlide key={i}>
            <img src={src} alt={alt} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
