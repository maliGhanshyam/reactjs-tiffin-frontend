import { Box } from "@mui/material";
import Slider from "react-slick";
import { CardSliderProps } from "./CardSlider.types";

const CardSlider: React.FC<CardSliderProps> = ({
  data,
  renderCard,
  settings,
}) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    ...settings, // Additional setting if any
  };

  return (
    <Box sx={{ maxwidth: 1200, margin: "0 auto" }}>
      <Slider {...defaultSettings}>
        {data.map((item) => (
          <Box key={item._id} sx={{ padding: "0 10px", width: "100%" }}>
            {renderCard(item)}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CardSlider;
