import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { USER_LOGIN, TOKEN } from "../../../../util/settings/Config";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
// import { Menu, Dropdown, Button } from "antd";
import { Select } from "antd";
// hook đa ngôn ngữ
import { useTranslation } from "react-i18next";

export default function Header(props) {
  const { t, i18n } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { Option } = Select;
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
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
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const handelLogout = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    dispatch({ type: "DANG_XUAT" });
    window.location.reload();
  };

  return (
    <div>
      {width >= 767 ? (
        <header className="header ">
          <div className="header__category">
            <NavLink className="navbar-brand" to="/">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////7QibkNivkNCn/+/v9q577Si/+8/L/7uz62tj8jHvvh4D8g3HqX1bMzc37SC3Rvrv+9/bwkozsbVn/8/HMzc7kOS7mOyW/LSP+8O/5y8joUkj8QibvgXr8/f35+frQ0ND5SS/iNSrYMyj9ppnQMSb39vbg39/W1tbfNCnHLyT//fz9+fjv7+/8qZzwPSbz8/Pr6+vn5+fj4+Pb29v6xsLyopr5opTnnJHhlIj7Ryz+6ef9rqP0qaH5UzrlOjD7RSnqOyW6KyL/4t3kz8zgzcrQtrP9tar9sqfte3TCd3L6emftbVrsbFnpUj3mQjgGeX2GAAAAF3RSTlMA+9EF9vDruKakj2lPSS8sGQ3i4b69OIta07gAAAM+SURBVGje1drpUhNBFIbhnuwrYe9JIIoLERQJqAkkJmELsqNsIu77/V+CJrH8JsxUf52R6SrfG3iqq7t/nSOchXPpZChmyX/KioWS6VxYeDeSSYwSQBsaTWRGPIhwNh6RN1gknnWdZjgVlTdcNDXcbwyNywAaH3IakyEZSKFJGEPM8K/8PcvwhAysiT/3Ek7JAEv13lg2KgMsmu3+wbgMtHjnV2YiMtAiGSHCCRlwibDIjcmAG8uJtCUDzkqLpAy8pAjJwAuJmAy8mLBk4FlCGuh/QZrtilTEkJnzOW7srK20qqfTt30iM/cfz1OluTY7u/D+q31PoQiVUShQpXrw23jw3bZVilAZ+TxTqq2O8dC2lYpQGkyp7MNQKEJlUGVvBYZCEQqDKrswlIpQGExpw1ArghpQ3I8XBhSOwKBK9QAGUYTKgJI/cj9eGEwRKgPIk2XX44VBFaFtzG05jb0FGFQRusbSs+694PHCoIrQNpy334ZBFSDccL6xnTUYXAHCDShNGHqK0DWgVA9w51wBwg0olRYMTUVoGlBaKzA0FaE0fh72DFRrfPnwTcuAAuSo4HWQ056BGlflH09tVycXl7ar4uF15NbdvFt5PX/4Oe+sflVetD2M7XevVl3G9BQQLwVMoc8olxdxDnTxtrIPBQaQPkXZOoz+Lo+nKntQYAAhCowNGNcqPZ+Suy+hwACipdRgeCttKDCA6Ci1RtdQKTtdBQYQXaVnqJXm0SoMF0KVWp0YHWVLVs+LMFwIU+obHYMox1ty81OxBAMIUWDQTjrKxzMYQBQKHi/+ObuXzU3JESgwGjCIMi2RA+FKDQZFzrQQKHhY3MAf9EaoUn/j1wDClHX/BhCi1F74N4AQxafBESh+DY5A8W1wBMod7f8BQxNBj6BQgyH8LNxgCFe4QRGucIMjXOEGR+jt87fLEa5wgyNc4QZHuMINjnCFGxzhCjc4whVucIQr3OAIV7jBEa5wgyNcgaEfRhuDKKWBDAtDmgGU0jYMjWIYN+kqMHQLYXCmrRRh6JUcfAS4tDygYaWNDDONjGVNDJiNjMpNDP2NrC+YWMQwsVJiYjnGxJqPiYUlE6tXRpfIjKzD/QKIj6Xp8VGBdwAAAABJRU5ErkJggg=="
                alt="Logo"
              />
            </NavLink>
            <nav className="navbar   navbar-dark   p-0 ">
              <ul className="navbar__content  ">
                <li>
                  <NavLink to="/" href="#carousel">
                    {t("home")}
                  </NavLink>
                </li>
                <li>
                  <a href="#cumRap">{t("cinema")}</a>
                </li>
                <li>
                  <a href="#news">{t("new")}</a>
                </li>
                <li>
                  <a href="#app">{t("App")}</a>
                </li>
              </ul>
            </nav>

            <div className={"loginUser"}>
              {!localStorage.getItem(USER_LOGIN) ? (
                <Fragment>
                  <button
                    onClick={() => {
                      history.push("/login");
                    }}
                    className="header__top--login pr-2"
                  >
                    <span >{t("signin")}</span>
                  </button>
                  <hr className="space" />
                  <button
                    onClick={() => {
                      history.push("/register");
                    }}
                    className="header__top--login pl-2"
                  >
                    <span>{t("signup")}</span>
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="dropdown">
                    <button className="nut_dropdown">
                      <span className="usertitle">Hi! {userLogin.hoTen}</span>
                    </button>
                    {userLogin.maLoaiNguoiDung.toLowerCase() === "quantri" ? (
                      <div className="noidung_dropdown">
                        <NavLink to="/user/thongtintaikhoan">
                          Thông tin cá nhân
                        </NavLink>
                        <NavLink to="/historybooking">Lịch sữ đặt vé</NavLink>
                        <NavLink to="/admin/films">Quản Lý Phim</NavLink>
                        <a
                          href="#"
                          onClick={() => {
                            handelLogout();
                          }}
                        >
                          Đăng Xuất
                        </a>
                      </div>
                    ) : (
                      <div className="noidung_dropdown">
                        <NavLink to="/user/thongtintaikhoan">
                          Thông tin cá nhân
                        </NavLink>
                        <NavLink to="/historybooking">Lịch sữ đặt vé</NavLink>
                        <a
                          href="#"
                          onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                          }}
                        >
                          Đăng Xuất
                        </a>
                      </div>
                    )}
                  </div>
                </Fragment>
              )}

              <Select
                defaultValue="Vie"
                style={{ width: 120,height:30, paddingLeft: 15 , lineHeight:30}}
                onChange={handleChange}
              >
                <Option value="vie">Vie</Option>
                <Option value="en">Eng</Option>
                <Option value="chi">Chi</Option>
              </Select>
            </div>
          </div>
        </header>
      ) : (
        <header id="home" className="header ">
          <div className="header__category">
            <NavLink className="navbar-brand" to="/">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////7QibkNivkNCn/+/v9q577Si/+8/L/7uz62tj8jHvvh4D8g3HqX1bMzc37SC3Rvrv+9/bwkozsbVn/8/HMzc7kOS7mOyW/LSP+8O/5y8joUkj8QibvgXr8/f35+frQ0ND5SS/iNSrYMyj9ppnQMSb39vbg39/W1tbfNCnHLyT//fz9+fjv7+/8qZzwPSbz8/Pr6+vn5+fj4+Pb29v6xsLyopr5opTnnJHhlIj7Ryz+6ef9rqP0qaH5UzrlOjD7RSnqOyW6KyL/4t3kz8zgzcrQtrP9tar9sqfte3TCd3L6emftbVrsbFnpUj3mQjgGeX2GAAAAF3RSTlMA+9EF9vDruKakj2lPSS8sGQ3i4b69OIta07gAAAM+SURBVGje1drpUhNBFIbhnuwrYe9JIIoLERQJqAkkJmELsqNsIu77/V+CJrH8JsxUf52R6SrfG3iqq7t/nSOchXPpZChmyX/KioWS6VxYeDeSSYwSQBsaTWRGPIhwNh6RN1gknnWdZjgVlTdcNDXcbwyNywAaH3IakyEZSKFJGEPM8K/8PcvwhAysiT/3Ek7JAEv13lg2KgMsmu3+wbgMtHjnV2YiMtAiGSHCCRlwibDIjcmAG8uJtCUDzkqLpAy8pAjJwAuJmAy8mLBk4FlCGuh/QZrtilTEkJnzOW7srK20qqfTt30iM/cfz1OluTY7u/D+q31PoQiVUShQpXrw23jw3bZVilAZ+TxTqq2O8dC2lYpQGkyp7MNQKEJlUGVvBYZCEQqDKrswlIpQGExpw1ArghpQ3I8XBhSOwKBK9QAGUYTKgJI/cj9eGEwRKgPIk2XX44VBFaFtzG05jb0FGFQRusbSs+694PHCoIrQNpy334ZBFSDccL6xnTUYXAHCDShNGHqK0DWgVA9w51wBwg0olRYMTUVoGlBaKzA0FaE0fh72DFRrfPnwTcuAAuSo4HWQ056BGlflH09tVycXl7ar4uF15NbdvFt5PX/4Oe+sflVetD2M7XevVl3G9BQQLwVMoc8olxdxDnTxtrIPBQaQPkXZOoz+Lo+nKntQYAAhCowNGNcqPZ+Suy+hwACipdRgeCttKDCA6Ci1RtdQKTtdBQYQXaVnqJXm0SoMF0KVWp0YHWVLVs+LMFwIU+obHYMox1ty81OxBAMIUWDQTjrKxzMYQBQKHi/+ObuXzU3JESgwGjCIMi2RA+FKDQZFzrQQKHhY3MAf9EaoUn/j1wDClHX/BhCi1F74N4AQxafBESh+DY5A8W1wBMod7f8BQxNBj6BQgyH8LNxgCFe4QRGucIMjXOEGR+jt87fLEa5wgyNc4QZHuMINjnCFGxzhCjc4whVucIQr3OAIV7jBEa5wgyNcgaEfRhuDKKWBDAtDmgGU0jYMjWIYN+kqMHQLYXCmrRRh6JUcfAS4tDygYaWNDDONjGVNDJiNjMpNDP2NrC+YWMQwsVJiYjnGxJqPiYUlE6tXRpfIjKzD/QKIj6Xp8VGBdwAAAABJRU5ErkJggg=="
                alt="Logo"
              />
            </NavLink>
            <div className="mobile_menu">
              <div className="sec-center">
                <input
                  className="dropdown"
                  type="checkbox"
                  id="dropdown"
                  name="dropdown"
                />
                <label className="for-dropdown" htmlFor="dropdown">
                  <i className="fa fa-list-ul pr-2"></i>
                  <i className="fa fa-arrow-down"></i>
                </label>

                {!localStorage.getItem(USER_LOGIN) ? (
                  <Fragment>
                    <div className="section-dropdown">
                      <NavLink to="/">
                        {t("home")} <i className="fa fa-home"></i>{" "}
                      </NavLink>
                      <a href="#">
                        {t("cinema")}
                        <i className="fa fa-film"></i>
                      </a>
                      <a href="#news">
                        {t("new")}
                        <i className="fa fa-newspaper"></i>
                      </a>
                      <a href="#app">
                        {t("App")}
                        <i className="fab fa-app-store"></i>
                      </a>
                      <button
                        onClick={() => {
                          history.push("/login");
                        }}
                        className="header__top--login "
                      >
                        <span>{t("signin")}</span>
                      </button>
                      <hr className="space" />
                      <button
                        onClick={() => {
                          history.push("/register");
                        }}
                        className="header__top--login"
                      >
                        <span>{t("signup")}</span>
                      </button>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="section-dropdown">
                      <h1 style={{ fontSize: "20px", color: "#fb4653" }}>
                        Hi {userLogin.hoTen} !
                      </h1>
                      <NavLink to="/">
                        {t("home")} <i className="fa fa-home"></i>{" "}
                      </NavLink>
                      <a href="#">
                        {t("cinema")}
                        <i className="fa fa-film"></i>
                      </a>
                      <a href="#news">
                        {t("new")}
                        <i className="fa fa-newspaper"></i>
                      </a>
                      <a href="#app">
                        {t("App")}
                        <i className="fab fa-app-store"></i>
                      </a>
                      <NavLink to="/user/thongtintaikhoan">
                        Thông tin cá nhân <i className="fa fa-arrow-right"></i>
                      </NavLink>

                      <NavLink to="/historybooking">
                        Lịch sữ đặt vé <i className="fa fa-arrow-right"></i>
                      </NavLink>
                      {}
                      <button
                        onClick={() => {
                          handelLogout();
                        }}
                      >
                        Đăng Xuất
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
