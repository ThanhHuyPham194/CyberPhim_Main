import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from "yup";
export default function Login(props) {
  const dispatch = useDispatch()
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(2, "Vui lòng nhập tài khoản từ 6 ký tự trở lên")
        .max(15, "Vui lòng nhập tài khoản tối đa 15 ký tự")
        .required("Vui lòng nhập tài khoản!"),
      matKhau: Yup.string()
        .min(3, "Vui lòng nhập mật khẩu từ 3 ký tự trở lên")
        .required("Vui lòng nhập mật khẩu!")
    }),
    onSubmit: values => {
      dispatch(dangNhapAction(values))
    },
  });
  return (
    <div className="content">
      <h3 className="form-title">Đăng Nhập</h3>

      <form onSubmit={(e) => {
        formik.handleSubmit(e)

      }} className="form-horizontal">
        <div className="form-group">
          <label htmlFor='taiKhoan'>Tài Khoản </label>
          <input id='taiKhoan'
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            name='taiKhoan' type="text"
            className="form-control" />
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p style={{ color: 'red' }}>{formik.errors.taiKhoan}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor='matKhau'>Mật Khẩu</label>
          <input
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            name='matKhau'
            id='matKhau'
            type="password"
            className="form-control" />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p style={{ color: 'red' }}>{formik.errors.matKhau}</p>
          )}
        </div>
        <button className="btn signin">Login</button>
        <div className="remember-me">
          <input type="checkbox" className="checkbox" />
          <span className="check-label">Remember Me</span>
        </div>
        <a href="#" className="forgot">Forgot Password</a>
      </form>
      <span className="separator">OR</span>
      <ul className="social-links">
        <li><a href='#'><i className="fab fa-google" /> Login with Google</a></li>
        <li><a href='#'><i className="fab fa-facebook-f" /> Login with Facebook</a></li>
      </ul>
      <span className="signup-link">Don't have an account? Sign up <NavLink to='/register'>here</NavLink></span>



    </div>

  )
}
