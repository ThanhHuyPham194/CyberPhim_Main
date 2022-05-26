import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layChiTietphongVeAction, chonGheAction, datVeAction, chuyentabsAction, datGheAction } from '../../redux/actions/QuanLyDatVeAction';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import {
  CloseCircleOutlined,
  UserAddOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { Tabs } from 'antd';
import { NavLink, Prompt } from 'react-router-dom';
import { connection } from '../../index'
import { useState } from 'react';
import HistoryBooking from '../HistoryBooking/HistoryBooking';

const { TabPane } = Tabs;
function Checkout(props) {
  const [datve, setDatve]= useState([true])
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
  // console.log(userLogin);
  const dispatch = useDispatch();
 
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])
  // gọi api chiTietPhongVe
  useEffect(() => {
    const action = layChiTietphongVeAction(props.match.params.id)
    // dispath function này đi
    dispatch(action);


    // nếu có 1 user nào đặt vé thì sẽ tự động cập nhật ở phòng vé
    connection.on('datVeThanhCong', () => {
      dispatch(action)
    })


    // LOAD DANH SÁCH GHẾ NGƯỜI KHÁC ĐANG ĐẶT KHI VÀO TRANG
    connection.invoke("loadDanhSachGhe", props.match.params.id);
    // load danh sách ghế đang đặt từ sever về ( lắng nghe sự kiện từ sever trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // loại mình ra khỏi dnah sách ghế
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)
      // console.log(dsGheKhachDat)

      // gộp tất cả danh sách ghế khách đặtcủa các user khác về 1 mảng
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe)
        return [...result, ...arrGhe]
      }, [])
      // đưa dữ liệu khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      // đưa dữ liệu về redux để xử lý
      dispatch(datGheAction(arrGheKhachDat))
      // console.log(arrGheKhachDat)
      // BẮT SỰ KIỆN KHI NGƯỜI CHỌN VÉ RELOAD LẠI TRANG
      window.addEventListener("beforeunload", clearGhe);
      return () => {
        clearGhe();
        window.removeEventListener("beforeunload", clearGhe);
      };
    })

  }, [])
  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classDangDat = "";
      let classGheMinhDat = "";
      let classGheKhachDat = "";
      // kểm tra có đang trong danh sách đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
      if (indexGheDD !== -1) {
        classDangDat = 'gheDangDat'
      }
      // kiểm trả xem  có phai ghế khách đang đặt hay không 
      let IndexGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
      if (IndexGheKhachDat !== -1) {
        classGheKhachDat = 'gheDangCoNguoiDat'
      }
      if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
        classGheMinhDat = "gheDangDat";
      }


      return <Fragment key={index}><button

        className={`ghe ${classGheVip} ${classDaDat} ${classDangDat} ${classGheMinhDat} ${classGheKhachDat}`}
        // xử lý đặt ghế
        onClick={() => {
          // gửi các giá trị gồm : ghế ,maLichChieu
          dispatch(chonGheAction(ghe, props.match.params.id));
        }}
        disabled={ghe.daDat || classGheKhachDat !== ""}
      >
        {classGheMinhDat !== "" ? (
          <UserAddOutlined />
        ) : ghe.daDat === true ? (
          <CloseCircleOutlined />
        ) : classGheKhachDat !== "" ? (
          <LoadingOutlined />
        ) : ghe.daDat === true ? (
          <CloseCircleOutlined />
        ) : (
          ghe.tenGhe
        )}
      </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className=" mt-2">
      <div className="grid grid-cols-12">
        <div className="col-span-9  lg:col-span-12">
          <div className="bg-[#565656] mt-2 mx-[10px]">
            <div className="man-hinh text-center text-white bg-black w-10/12 m-auto">MÀN HÌNH</div>
            <div className="m-auto w-8/12 md:w-11/12 sm:5/6 pt-10 pb-4">
              {renderSeats()}
            </div>
          </div>
          <div className="flex items-center justify-center sm:block m-auto pt-4 ">
            <div className="flex items-center sm:text-[10px] ">
              <button className="ghe" />Ghế trống
            </div>
            <div className="flex items-center sm:text-[10px]">
              <button className="ghe gheVip " />Ghế VIP
            </div>
            <div className="sm:text-[10px]">
              <button className="ghe gheDangDat">
                <span role="img" aria-label="user-add" className="anticon anticon-user-add">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="user-add" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
                  </svg>
                </span>
              </button>Ghế bạn đã đặt
            </div>
            <div className="sm:text-[10px]">
              <button className="ghe gheDangCoNguoiDat">
                <span role="img" aria-label="loading" className="anticon anticon-loading anticon-spin">
                  <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" /></svg>
                </span>
              </button>Ghế có người đang chọn
            </div>
            <div className="sm:text-[10px]">
              <button className="ghe gheDaDat">
                <span role="img" aria-label="close-circle" className="anticon anticon-close-circle">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" /><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /></svg>
                </span>
              </button>Ghế đã có người đặt</div>
          </div>

        </div >
        <div className="col-span-3  lg:col-span-12 checkout_info">
          <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex justify-center checkout__right-vnd text-2xl text-green-600">
              {danhSachGheDangDat
                ?.reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}vnđ</li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <span className="px-1 py-0.5 bg-[#fb4226] rounded text-white">C18</span>
              <span className="pl-1">{thongTinPhim.tenPhim}</span>
              <div className="text-[13px] font-semibold mt-2">
                <p>{thongTinPhim.diaChi}</p>
                <p>{thongTinPhim.ngayChieu}-{thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
              </div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between">
              <span className="text-orange-500">Ghế:
                {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                  return <span key={index} className='text-green-500 font-medium px-1 text-[16px]'>G{gheDD.stt},</span>
                })}
              </span>
              <span className="text-green-600 text-[16px]">
                {danhSachGheDangDat
                  ?.reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}vnđ</span>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg">
              <div className="text-xs">
                <i>Email</i>
              </div>
              <div>{userLogin.email}</div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-email"><div>
              <i> Số Điện Thoại: </i>
            </div> {userLogin.soDT}
              <div />
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-voucher">
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <div className="text-xs">Mã giảm giá</div>
                  <input className="focus:outline-none" type="text" placeholder="Nhập tại đây..." />
                </div>
                <div className="col-span-1 voucher-btn">
                  <button className=" bg-[#d1e7dd] border-2 border-[#fb4226] rounded py-1 px-2 focus:outline-inherit" type="button">Áp dụng</button>
                </div>
              </div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg">
              <div>Hình thức thanh toán</div>
              <div className=" text-red-500 text-xs">Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.</div>
            </li>
            <li className="w-full text-center px-4 py-2 border-b border-gray-200 dark:border-gray-600 checkout__right__bottom-hoan-ve">
              <p>
                <img src="http://tixvn.click/static/media/480px-OOjs_UI_icon_alert_destructive.svg.be30e7d950a4b356b4ec.png" width="20px" className='inline' alt='...' />
                Vé đã mua không thể đổi hoặc hoàn tiền<br />Mã vé sẽ được gữi qua mã <span className="text-orange-400">SMS</span> và <span className="text-orange-400">Email</span> đã đăng ký</p>
            </li>
            <li className=" w-full mt-[80px] px-4 pt-3 pb-1 border-b border-gray-200 dark:border-gray-600">
              {danhSachGheDangDat.length != 0 ? <button
                type="button"

                className=" py-2.5 px-5  w-full text-sm font-medium  text-gray-900 focus:outline-none bg-[#d1e7dd] rounded-lg border border-blue-200 hover:bg-[#fb4226] hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"

                onClick={() => {
                  const thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = props.match.params.id;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;
                  dispatch(datVeAction(thongTinDatVe))
                  setDatve(false);
                }}
              >ĐẶT VÉ</button> :
                <button
                  type="button"

                  className="checkout-btn cursor-not-allowed  py-2.5 px-5  w-full text-sm font-medium  text-gray-900 focus:outline-none bg-[#d1e7dd] rounded-lg border border-blue-200   focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                  title="Vui lòng chọn vé để đặt"
                >ĐẶT VÉ</button>
              }

            </li>
          </ul>

        </div>
      </div>
      
    <Prompt
      when={datve}
      message={location => ('Bạn thực sự muốn rời khỏi trang ???')}

    />
    </div>
  )
}


function callback(key) {
  // console.log(key);
}

export default function (props) {
  const { tabsActive } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch();
  return (
    <div className="p-5 detail-main relative">
      <Tabs defaultActiveKey='1' activeKey={tabsActive.toString()} onChange={(key) => {
        dispatch(chuyentabsAction(key))
      }}>
        <TabPane tab="01 CHỌN GHÉ VÀ THANH TOÁN " key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2" >
          <HistoryBooking {...props} />
        </TabPane>
      </Tabs>


      <div className="absolute top-[48px] right-[85px] md:top-[2px] md:right-[28px] cursor-pointer">
        <NavLink to='/' >
          <img  className="w-[55px] md:w-[44px]" src='http://tixvn.click/static/media/logo.af00d8dd04677a4ee789.png' alt-='..' />
        </NavLink>
      </div>
    </div>

  )
}
// export function Historybooking(props) {
//   const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
//   // console.log(userLogin)
//   const dispatch = useDispatch();
//   useEffect(() => {

//     dispatch(layThongTinNguoiDungAction())
//   }, [])
//   const renderTicketFilm = () => {
//     return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
//       const seats = _.first(ticket.danhSachGhe)
//       return (
        
//         <div className="p-2 lg:w-full md:w-1/2 w-1/3" key={index}>
//           <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//             <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
//             <div className="flex-grow">
//               <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
//               <p className="text-gray-500">Ngày đặt :{moment(ticket.ngayDat).format('DD-MM-YYYY ~ hh:mm A')}</p>
//               <p>Địa điểm:{seats.tenHeThongRap} </p>
//               <p className=' text-green-500'> {seats.tenCumRap} - Ghế số : {_.sortBy(ticket.danhSachGhe, ['maGhe']).map((soghe, index) => {
//                 return (
//                   <span key={index} > {soghe.tenGhe},</span>
//                 )
//               })}</p>
//             </div>
//           </div>
//         </div>
//       )
//     })
//   }
//   return (
   
//     <div>
//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="flex flex-col text-center w-full mb-20">
//             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#fb4226]">Kết Quả Đặt Vé</h1>
//           </div>
//           <div className="flex flex-wrap -m-2">

//             {renderTicketFilm()}

//           </div>
//         </div>
//       </section>

//     </div>
//   )
// }