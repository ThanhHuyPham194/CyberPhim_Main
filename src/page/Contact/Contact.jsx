import React from 'react'
import Slider from "react-slick";
import data from './data.json'
export default function Contact(props) {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 3000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
 const handleSlider =()=>{
    return data.map((src,index)=>{
      return(
        <div key={index}>
          <img className="app__body__content__right__slider__img-slider" src={src.src} alt='...' />
        </div>
      )
    })
  }
  return (
    <div className='app' id='app'>
      <div className='container mx-auto app__body '>
        <div className='app__body__content row  '>
          <div className="app__body__content__left col-12 col-md-6">
            <h1>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
            <button className=" btn ">App miễn phí - Tải về ngay!</button>
            <div>TIX có hai phiên bản <a href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"> iOS </a> &amp; <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"> Android    </a></div>
          </div>
          <div className='app__body__content__right text-center col-12 col-md-6'>
            <img src='http://tixvn.click/static/media/mobiles.535378e87f035586931e.png' alt='...' />
            <div className='app__body__content__right__slider hiden'>
              <Slider {...settings}>

                {handleSlider()}
                
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
