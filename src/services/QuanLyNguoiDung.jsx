import { BaseService } from "./BaseService";
import { GROUPID } from "../util/settings/Config";

export class QuanLyNguoiDungServices extends BaseService {
    constructor(){
        super()
    }
    nguoiDungDangNhap = (thongTinDangNhap) =>{ // trong thông tin đăng nhập bao gồm {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    layThongTinNguoiDung = () =>{
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    layThongTinNguoiDungDangNhap= (taiKhoan) =>{
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung = (formData) =>{
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formData)
    }
    dangKyNguoiDung = (formData) =>{
        return this.post(`/api/QuanLyNguoiDung/DangKy`,formData)
    }
}
export const quanlyNguoiService = new QuanLyNguoiDungServices()