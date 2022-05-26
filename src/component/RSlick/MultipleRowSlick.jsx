import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from '../Film/Film';
import { useDispatch, useSelector } from 'react-redux';
import { listFilmDangChieu, listFilmSapChieu } from '../../redux/actions/QuanLyFilmAction'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: "block" ,right:0}}
      onClick={onClick}
    >
    </div>

  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-20px' ,zIndex:3}}
      onClick={onClick}
    >
    </div>
  );
}
export default function MultipleItems({ arrFilm }) {
  const renderFilm = () => {
    return arrFilm.map((film, index) => {
      return (
        <Film film={film} key={index} />
      )
    })
  }
  const [show, setShow] = useState(true);
  const settings = {
    className: "center variable-width gridRow",
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
    slidesToScroll:4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
          responsive: [
        {
          breakpoint: 1024,
          settings: {
    className: "center variable-width gridRow",
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            className: "center variable-width gridRow",
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 580,
          settings: {
            className: "center variable-width gridRow",
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode:true,initialSlide: 2,
          }
        }
      ]
  };
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyFilmReducer);
  let activeClassDC = show === true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = show === false ? 'active_Film' : 'none_active_Film';
  return (
    <div className='mb-5' id='lichChieu'>
      <div className={`${styleSlick['button-show-film']}`}>
        <button className={`${styleSlick[activeClassDC]}`} onClick={() => {
          dispatch(listFilmDangChieu());
          setShow(true)
        }}>Phim Đang Chiếu</button>
        <button className={`${styleSlick[activeClassSC]}`} onClick={() => {
          dispatch(listFilmSapChieu());
          setShow(false);
        }}>Phim Sắp Chiếu</button>
      </div>
      <Slider {...settings}>
        {renderFilm()}
      </Slider>

    </div>
  );
}
