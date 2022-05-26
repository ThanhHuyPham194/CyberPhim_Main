import { BaseService } from "./BaseService";
import { GROUPID } from "../util/settings/Config";

export class QuanLyPhimServices extends BaseService {
    constructor(){
        super()
    }
    LayDanhSachBanner = () =>{
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }
    layDanhSachPhim =(tenPhim ='')=>{
        if(tenPhim.trim() != ''){
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }else{

            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
        }
        // khi lấy theo group thì sữ dụng GROUPID
        // return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)

    }
    themPhimUpLoadHinh = (formData) =>{
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData)
    }
    layThongTinPhim = (maPhim) =>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpLoad = (formData) =>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }
    xoaPhim = (maPhim) =>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}
export const quanlyPhimService = new QuanLyPhimServices()
