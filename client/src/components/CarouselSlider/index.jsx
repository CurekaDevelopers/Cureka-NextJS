import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import style from "./style.module.scss";

const CustomPrevArrow = (props) => (
  <span className={style.prevArrow} onClick={props.onClick}></span>
);

const CustomNextArrow = (props) => (
  <span className={style.nextArrow} onClick={props.onClick}></span>
);

const CarouselSlider = ({ children, settings = {} }) => {
  const slidesToShow = 4;
  const defaultSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: (settings?.slidesToShow || slidesToShow || 4) - 1 || 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    ...settings,
  };
  return <Slider {...defaultSettings}>{children}</Slider>;
};

export default CarouselSlider;
