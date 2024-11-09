import { Box } from "@mui/material";
import Slider from "react-slick";
import { CardSliderProps } from "./CardSlider.types";
import { boxContainerStyles, sliderItemStyles } from "./CardSlider.styles";

const CardSlider: React.FC<CardSliderProps> = ({ data, renderCard }) => {
  const defaultSettings = {
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box sx={boxContainerStyles}>
      <Slider {...defaultSettings}>
        {data.map((item) => (
          <Box key={item._id} sx={sliderItemStyles}>
            {renderCard(item)}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CardSlider;
