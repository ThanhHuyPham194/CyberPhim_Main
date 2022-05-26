import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { GROUPID } from '../../util/settings/Config'; 
import { useFormik } from 'formik';
import {DangKyAction,dangKyNguoiDungAction} from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from "yup";

export default function Register(props) {
  const dispatch = useDispatch()
  const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
        matKhau: "",
        confirmPassword: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(6, "Tài khoản phải tối thiểu 6 kí tự")
        .max(255, "Tài khoản tối đa 255 kí tự")
        .required("vui lòng nhập tài khoản!"),
        hoTen: Yup.string()
        .min(6, "Họ tên phải tối thiểu 6 kí tự")
        .max(255, "Họ tên tối đa 255 kí tự")
        .required("vui lòng nhập họ tên!"),
        soDt: Yup.string()
        .required("Vui lòng nhập số điện thoại !")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "Vui lòng nhập só điện thoại hợp lệ")
        .max(10, "Vui lòng nhập só điện thoại hợp lệ"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email !"),
        matKhau: Yup.string()
        .min(8, "Tối thiểu 8 ký tự và phải có ít nhất 1 chữ in hoa")
        .required("Vui lòng nhập mật khẩu !"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("matKhau")], "Mật khẩu nhập lại không khớp")
        .required("Vui lòng nhập lại mật khẩu !")
    }),
    onSubmit: values => {
      const thongTinDangKy = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        soDt: values.soDt,
        maNhom: values.maNhom= GROUPID,
        hoTen: values.hoTen,
      };
      console.log(values)
      dispatch(DangKyAction(thongTinDangKy));
    },
  });
  return (
    <div className="content">
            <h3 className="form-title">Đăng Ký</h3>
            <form onSubmit={(e)=>{
              formik.handleSubmit(e)

              }} className="form-horizontal">
              <div className="form-group">
                <label htmlFor='taiKhoan'>Tài Khoản </label>
                <input id='taiKhoan' onChange={formik.handleChange} name='taiKhoan' type="text" className="form-control" />
                {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p style={{ color: 'red' }}>{formik.errors.taiKhoan}</p>
          )}
              </div>
              <div className="form-group">
                <label htmlFor ='matKhau'>Mật Khẩu</label>
                <input onChange={formik.handleChange} name='matKhau' id='matKhau' type="password" className="form-control" />
                {formik.errors.matKhau && formik.touched.matKhau && (
            <p style={{ color: 'red' }}>{formik.errors.matKhau}</p>
          )}
              </div>
              <div className="form-group">
                <label htmlFor ='confirmPassword'>Nhập lại Mật Khẩu</label>
                <input onChange={formik.handleChange} name='confirmPassword' id='confirmPassword' type="password" className="form-control" />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p>
          )}
              </div>
              <div className="form-group">
                <label htmlFor ='hoTen'>Họ tên</label>
                <input onChange={formik.handleChange} name='hoTen' id='hoTen'  className="form-control" />
                {formik.errors.hoTen && formik.touched.hoTen && (
            <p style={{ color: 'red' }}>{formik.errors.hoTen}</p>
          )}
              </div>
              <div className="form-group">
                <label htmlFor ='soDt'>Số điện thoại</label>
                <input onChange={formik.handleChange} name='soDt' id='soDt'  className="form-control" />
                {formik.errors.soDt && formik.touched.soDt && (
            <p style={{ color: 'red' }}>{formik.errors.soDt}</p>
          )}
              </div>
              <div className="form-group">
                <label htmlFor ='email'>Email</label>
                <input onChange={formik.handleChange} name='email' id='email'  className="form-control" />
                {formik.errors.email && formik.touched.email && (
            <p style={{ color: 'red' }}>{formik.errors.email}</p>
          )}
              </div>
              <button className="btn signin">Sign up</button>
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
            <span className="signup-link">Don't have an account? Sign up <NavLink to='/login'>here</NavLink></span>
         
</div>
  )
}
