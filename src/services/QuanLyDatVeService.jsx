  import { BaseService } from "./BaseService";
import {ThongTinDatVe} from '../../src/_core/models/ThongTinDatVe'

export class QuanLydatVeServices extends BaseService {
    constructor(){
        super()
    }
    laychiTietPhongVe = (maPhongVe) =>{ // maLichChieu lấy từ url
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPhongVe}`)
    }
    datVe = (thongTinDatVe = new ThongTinDatVe())=>{ 
       return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe)

    }
     /* thongTinDatVe : {
        "maLichChieu": 0,
        "danhSachVe": [
          {
            "maGhe": 0,
            "giaVe": 0
          }
        ]
      } của api  */

      taoLichChieu = (formData) =>{
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`,formData)
      }
      
}
export const quanLydatVeServices = new QuanLydatVeServices()