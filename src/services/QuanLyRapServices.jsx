import { BaseService } from "./BaseService";
import { GROUPID } from "../util/settings/Config";

export class QuanLyRapServices extends BaseService {
    constructor(){
        super()
    }
    LayDanhSachRap = (tenCumRap = '') =>{
        if(tenCumRap == ''){

            return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom${GROUPID}`)
        }else{
            return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${tenCumRap}maNhom${GROUPID}`)

        }
    }
    layThongTinLichChieuPhim = (maPhim) =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () =>{
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`)

    }
    layThongTinCumRap = (maHeThongRap) =>{
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)

    }
    
  
}
export const quanLyRapService = new QuanLyRapServices()