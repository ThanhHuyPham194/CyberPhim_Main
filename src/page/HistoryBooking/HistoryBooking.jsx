import moment from 'moment';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction} from '../../redux/actions/QuanLyNguoiDungAction';
import _ from "lodash";
import { Back } from '../Admin/Film/Film';

export default function HistoryBooking() {
    const { thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)
  // console.log(userLogin)
  // console.log(thongTinNguoiDung)
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(layThongTinNguoiDungAction())
  }, [])
  const renderTicketFilm = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe)
      return (
        
        <div className="p-2 lg:w-full md:w-1/2 w-1/3" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
              <p className="text-gray-500">Ngày đặt :{moment(ticket.ngayDat).format('DD-MM-YYYY ~ hh:mm A')}</p>
              <p>Địa điểm:{seats.tenHeThongRap} </p>
              <p className=' text-green-500'> {seats.tenCumRap} - Ghế số : {_.sortBy(ticket.danhSachGhe, ['maGhe']).map((soghe, index) => {
                return (
                  <span key={index} > {soghe.tenGhe},</span>
                )
              })}</p>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <Fragment>
    <Fragment>

    <Back />
    </Fragment>
  <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#fb4226]">Kết Quả Đặt Vé</h1>
        </div>
        <div className="flex flex-wrap -m-2">

          {renderTicketFilm()}

        </div>
      </div>
    </section>

  </div>
  </Fragment>
  )
}
