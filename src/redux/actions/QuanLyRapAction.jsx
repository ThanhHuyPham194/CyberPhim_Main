import { quanLyRapService } from "../../services/QuanLyRapServices"
import { SET_CUM_RAP ,SET_CHI_TIET_PHIM} from '../types/QuanLyRapType'
import { displayLoading, hidenLoading } from '../actions/LoadingAction';

export const layDanhSachCumRapAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoading())

            const result = await quanLyRapService.LayDanhSachRap()
            // đưa lên reducer is
            if (result.status === 200) {
                dispatch({
                    type: SET_CUM_RAP,
                    heThongRapChieu: result.data.content
                })
            }
            dispatch(hidenLoading())

        } catch (e) {
            console.log(e.response?.data)
        }
    }
}
export const layThongTinChiTietPhim = (id) =>{
    return async dispatch =>{
        try{
            
            dispatch(displayLoading())
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);
            dispatch({
                type:SET_CHI_TIET_PHIM,
                filmDetail:result.data.content
            })
            
            dispatch(hidenLoading())
        }
        catch (e) {
            console.log(e.response?.data)
        }
    }
}