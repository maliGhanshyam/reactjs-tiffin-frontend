import { Box } from "@mui/material";
import Slider from "react-slick";
import { CardSliderProps } from "./CardSlider.types";
import { styles } from "./CardSlider.styles";

const CardSlider = <T extends { _id: string }>({ data, children, settings }: CardSliderProps<T>) => {
  const defaultSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    dots: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
    ...settings,
  };

  return (
    <Box sx={styles.boxContainerStyles}>
      <Slider {...defaultSettings}>
        {data.map((item) => (
          <Box key={item._id} sx={styles.sliderItemStyles}>
            {typeof children === 'function' ? children(item) : children}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CardSlider;



