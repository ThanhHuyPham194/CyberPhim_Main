
import {SET_CUM_RAP} from '../types/QuanLyRapType'
const stateDefault = {
    heThongRapChieu:[]
}

export const QuanLyRapReducer = (state= stateDefault, action)=>{
    switch(action.type){
        case SET_CUM_RAP :{
            state.heThongRapChieu = action.heThongRapChieu;
            return {...state}
        }
        default: return { ...state }
    }
}