import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
export default function HomeCarousel(props) {
  const { arrBanner } = useSelector((state) => state.CarouselReducer);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // call api render onlyone
  useEffect(() => {
    dispatch(getCarouselAction);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    // hiển thị lại width
    window.addEventListener("resize", handleResize);
    // clean up để fix lỗi toggle
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  const contentStyle = {
    height: "700px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center ",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };

  const renderBanner = () => {
    return arrBanner.map((img, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${img.hinhAnh})` }}
          ></div>
        </div>
      );
    });
  };
  return (
    <div id="carousel">
      <Carousel effect="fade" autoplay>
        {renderBanner()}
      </Carousel>
    </div>
  );
}
