import { USER_LOGIN } from "../../util/settings/Config";
import { DANG_NHAP,SET_THONG_TIN_NGUOI_DUNG ,SET_THONG_TIN_NGUOI_DUNG_DANG_NHAP} from "../types/QuanLyNguoiDungType"
import {TOKEN} from "../../util/settings/Config"

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const stateDefault = {
    userLogin :user,
    thongTinNguoiDung :{
    },
    thongTinNguoiDungCapNhat :{}
}
export const QuanLyNguoiDungReducer = (state= stateDefault,action) =>{
    switch(action.type){
        case DANG_NHAP:{
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)
            return { ...state,userLogin:thongTinDangNhap}
        }
        case SET_THONG_TIN_NGUOI_DUNG :{

            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state}
        }
        case SET_THONG_TIN_NGUOI_DUNG_DANG_NHAP:{
            state.thongTinNguoiDungCapNhat = action.thongTinNguoiDungCapNhat
        }

        default: return { ...state }
    }
}
