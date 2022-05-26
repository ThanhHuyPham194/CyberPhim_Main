import { quanLydatVeServices } from '../../services/QuanLyDatVeService'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import {SET_CHI_TIET_PHONG_VE,CHON_GHE, DAT_VE_HOAN_TAT,CHUYEN_TABS,CHUYEN_TABS_ACTIVE,DAT_GHE} from '../types/QuanLyDatVeType'
import { displayLoading, hidenLoading } from '../actions/LoadingAction';
import { connection } from '../../index';



export const layChiTietphongVeAction = (maPhongVe) =>{
     return async dispatch=>{
         try{
            dispatch(displayLoading())
            const result = await quanLydatVeServices.laychiTietPhongVe(maPhongVe);
            if(result.status===200){
                    dispatch({
                        type:SET_CHI_TIET_PHONG_VE,
                        chiTietPhongVe:result.data.content
                    })
            }
            dispatch(hidenLoading())
         }
         catch(err){
             console.log(err.response?.data)
            dispatch(hidenLoading())

         }
     }
}
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) =>{
    return async (dispatch,getState) =>{
        try{
            dispatch(displayLoading())
           const result = await quanLydatVeServices.datVe(thongTinDatVe);
           // đặt vé thành công gọi api load lại
           await dispatch(layChiTietphongVeAction(thongTinDatVe.maLichChieu))
           await dispatch({
               type :DAT_VE_HOAN_TAT
           })
           await dispatch(hidenLoading());

           let userLogin = getState().QuanLyNguoiDungReducer.userLogin
           await connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu)
           dispatch({
               type: CHUYEN_TABS
           })
        }
        catch(err){
            if(err.status == 401){
                alert('lỗi')
            }
            dispatch(hidenLoading())
            console.log(err.response?.data)
            
        }
    }
}
export const chonGheAction = (gheDuocChon,maLichChieu) => {
    // thunk trả ra tham số dispatch và getState
    return async (dispatch,getState) => { 
        // đưa thông tin ghế lên reducer
        await dispatch({
            type:CHON_GHE,
            gheDuocChon
        })
        // call api về backend 
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        // đổi mảng thành chuổi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        //call api signalR
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu)
       
    }
}
export const chuyentabsAction = (number) =>{
    return { type:CHUYEN_TABS_ACTIVE,number}
}

export const datGheAction = (arrGheKhachDat) =>{
    return {
        type:DAT_GHE,
        arrGheKhachDat
    }
}