import { Left, Right } from "./SVG";
import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/pagination";
import ProductCard from "./Product-card";
import { Navigation, Pagination } from "swiper/modules";
export default function CarrouselProducts({ products, openModal }) {
  return (
    <section className="w-full mx-auto h-96 flex gap-10 box-border px-5  items-center justify-center">
      <button className="rounded-full swiper-button-prev hidden lg:flex justify-center items-center hover:scale-105  cursor-pointer h-10 w-20 bg-cheese">
        <Left color={"#fff"} size={24}></Left>
      </button>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        breakpoints={{
          1024: { slidesPerView: 3 },
        }}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard openModal={openModal} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="rounded-full swiper-button-next hidden lg:flex justify-center items-center hover:scale-105  cursor-pointer h-10 w-20 bg-cheese">
        <Right color={"#fff"} size={24}></Right>
      </button>
    </section>
  );
}
