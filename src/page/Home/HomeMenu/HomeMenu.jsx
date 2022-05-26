import React, { useState, memo } from 'react'
import { Tabs} from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
function HomeMenu({ heThongRapChieu }) {
  const { TabPane } = Tabs;
  const [state, setState] = useState({ tabPosition: 'left' })
  const changeTabPosition = e => {
    setState({ tabPosition: e.target.value });
  };
  const { tabPosition } = state;
  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = state;
      return (
        <TabPane tab={
          <img src={heThongRap.logo} className='rounded-circle my-1' width='50px' />
        } key={index}>
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumrap, index) => {
              return <TabPane tab={
                <div className='info-cumrap my-1'>
                  <h4>{cumrap.tenCumRap}</h4>
                  <h6>{cumrap.diaChi.length >= 30 ? <span>{cumrap.diaChi.slice(0, 31) + "..."}</span> : <span>{cumrap.diaChi}</span>}</h6>
                  <a>[Chi tiết]</a>
                </div>
              }
                key={index
                }>
                  <div >

                 
                {cumrap.danhSachPhim.map((phim, index) => {
                  return (
                    <div className="tab-film" key={index}>
                      <img src={phim.hinhAnh}
                       onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="https://picsum.photos/200";}}
                        alt={phim.tenPhim} width={100} height={125} />
                      <div className="tab-film-info">
                        <h2><span>C18</span>{phim.tenPhim}</h2>
                        <div className="tab-film-info-time">
                          {phim.lstLichChieuTheoPhim?.slice(0, 4).map((xuatchieu, index) => {
                            return (
                              <NavLink to={`/checkout/${xuatchieu.maLichChieu}`} key={index}>

                                <span className="text-danger">
                                  {moment(xuatchieu.ngayChieuGioChieu).format('DD-MM-YYYY')}
                                </span>
                                <span className="text-secondary">~</span>
                                <span className='tab-film-info-time-day'>
                                  {moment(xuatchieu.ngayChieuGioChieu).format('hh:mm A')}
                                </span>


                              </NavLink>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
                 </div>
              </TabPane>
            })}
          </Tabs>
        </TabPane>
      )
    })
  }
  return (
    <div className="he_thong_rap_chieu_film" id='cumRap'>
      <Tabs tabPosition={tabPosition}>
        {renderHeThongRap()}
      </Tabs>
    </div>
  );
}

export default memo(HomeMenu)
