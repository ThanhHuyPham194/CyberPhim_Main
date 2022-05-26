import { quanlyNguoiService } from '../../services/QuanLyNguoiDung'
import { DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_DANG_NHAP } from '../types/QuanLyNguoiDungType'
import { history } from '../../App'
import { displayLoading, hidenLoading } from '../actions/LoadingAction';
import Swal from 'sweetalert2'

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanlyNguoiService.nguoiDungDangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP,
                    thongTinDangNhap: result.data.content
                })

                let timerInterval;
                Swal.fire({
                  title: "Đăng nhập thành công",
                  html: "Bạn sẽ được chuyển hướng sau <b></b> ",
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {
                      b.textContent = Swal.getTimerLeft();
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    history.push('/');
                  }
                });
             }} catch (e) {
            console.log(e.response?.data)
            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: "Vui lòng thử lại !",
                // footer: '<a href>Why do I have this issue?</a>',
                timerProgressBar: false,
                showConfirmButton: false,

                timer: 2000,
            });
            await dispatch(hidenLoading())
        }
    }
}
export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoading())
            const result = await quanlyNguoiService.layThongTinNguoiDung();
            // console.log(result)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }

               dispatch(hidenLoading())
        }
        catch (e) {
            console.log(e.response?.data)
            dispatch(hidenLoading())
        }
    }
}
export const layThongTinNguoiDungDanngNhapAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanlyNguoiService.layThongTinNguoiDungDangNhap(taiKhoan);
            // console.log(result.data.content)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG_DANG_NHAP,
                    thongTinNguoiDungCapNhat: result.data.content
                })
            }
        }
        catch (e) {
            console.log(e.response?.data)
        }
    }
}
export const capNhatThongTinNguoiDungAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanlyNguoiService.capNhatThongTinNguoiDung(formData);
            // console.log(result.data.content)
            if (result.status === 200) {

                Swal.fire({
                    icon: "success",
                    title: "Cập nhật thành công! ",
                    showConfirmButton: false,
                    timer: 1500,
                });

            }
        }
        catch (e) {
            if(e.response?.status == 400){
                Swal.fire({
                    icon: "error",
                    title: "Cập nhật thất bại!",
                    text: 'Vui lòng thử lại',
                });
            }
        }
    }
}

export const DangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const res = await quanlyNguoiService.dangKyNguoiDung(thongTinDangKy);
            // console.log(res);
            if (res.status === 200) {

                Swal.fire({
                    icon: "success",
                    title: "Đăng ký thành công! Vui lòng đăng nhập lại",
                    showConfirmButton: false,
                    timer: 1500,
                });

            }
            history.push('/login');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Đăng ký thất bại!",
                text: `${error.response?.data.content}`,
            });
            console.log(error);
        }
    };
};
