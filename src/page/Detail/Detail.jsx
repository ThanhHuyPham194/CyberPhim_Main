import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyFilmReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    // thể hiện thông tin param ra url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);
  return (
    <div
      className="detail"
      style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
    >
      <div className="detail_info">
        <div className="container d-flex">
          <div className="detail_info_card d-flex">
            <img src={filmDetail.hinhAnh} alt="..." />
            <div className="detail_info_card_title">
              <p>{filmDetail.tenPhim}</p>
              <p>
                Ngày Chiếu{" "}
                {moment(filmDetail.ngayKhoiChieu).format("DD-MM-YY ~ hh:mm A")}
              </p>
              <a href="#detail_info_tabs" className="detail_info_card_button">
                Đặt Vé
              </a>
            </div>
          </div>
          <div className="detail_info_rating">
            <div className="circle-wrap">
              <div className="circle">
                <div className="mask full">
                  <div className="fill"></div>
                </div>

                <div className="mask half">
                  <div className="fill"></div>
                </div>

                <div className="inside-circle">5.0</div>
              </div>
            </div>
            <div className="detail_info_rating_star">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-alt"></i>
            </div>
            <p>Số người đánh giá : {filmDetail.danhGia} người</p>
          </div>
        </div>
        <div className="detail_info_tabs container" id="detail_info_tabs">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch Chiếu" key="1">
              {filmDetail.heThongRapChieu?.length !== 0 ? (
                <Tabs
                  className="detail_info_tabs_time"
                  centered
                  tabPosition={"left"}
                >
                  {filmDetail.heThongRapChieu?.map((rapChieu, index) => {
                    return (
                      <TabPane
                        key={index}
                        tab={
                          <div className="text-left my-4 mx-2">
                            <img
                              className="rounded-circle border border-success mb-1"
                              src={rapChieu.logo}
                              alt={rapChieu.maHeThongRap}
                              width={50}
                              height={50}
                            />
                            <p className="pl-1">{rapChieu.maHeThongRap}</p>
                          </div>
                        }
                      >
                        {rapChieu.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index} className="my-4">
                              <div className="text-left d-flex py-4">
                                <img
                                  src={cumRap.hinhAnh}
                                  alt={cumRap.maCumRap}
                                  width={70}
                                />
                                <div className="detail_info_tabs_time_addrea">
                                  <p> {cumRap.tenCumRap} </p>
                                  <p> {cumRap.diaChi} </p>
                                </div>
                              </div>
                              <div className="row text-left detail_info_tabs_time_row">
                                {cumRap.lichChieuPhim
                                  ?.slice(0, 9)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        className="detail_info_tabs_time_row_col col-sm-3 col-4 p-3 m-3"
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("DD-MM-YY ")}
                                        ~
                                        <span>
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format(" hh:mm A")}
                                        </span>
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              ) : (
                <div className="detail_info_tabs_time_no">
                  <h5>Chưa có lịch chiếu phim ,xin vui lòng quay lại sau.</h5>
                </div>
              )}
            </TabPane>
            <TabPane tab="Mô tả" key="2">
              <p style={{ fontSize: 20, color: "#fff" }}>{filmDetail.moTa}</p>
            </TabPane>
            <TabPane tab="Đánh giá" key="3">
              <p style={{ fontSize: 20, color: "#fff" }}>
                Được đánh giá :{" "}
                <span style={{ color: "yellow" }}> 4.5 sao </span>/{" "}
                {filmDetail.danhGia} người đánh giá
              </p>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
