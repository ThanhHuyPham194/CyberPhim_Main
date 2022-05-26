import {LIST_FILM,SET_FILM_DANG_CHIEU,SET_FILM_SAP_CHIEU, SET_THONG_TIN_FILM} from '../types/QuanLyPhimType'
import { quanlyPhimService } from '../../services/QuanLyPhimServices'
import {displayLoading, hidenLoading} from '../actions/LoadingAction'
import { history } from '../../App';
import Swal from 'sweetalert2';
export const layDanhSachPhimAction = (tenPhim ='')=>{
    return async (dispatch)=>{

    
    try{
      
      dispatch(displayLoading())
        const result = await quanlyPhimService.layDanhSachPhim(tenPhim)
        // đưa lên reducer is
        dispatch({
          type: LIST_FILM,
          arrFilm:result.data.content
        })
        
        dispatch(hidenLoading())
      }
      catch(err){
        console.log(err);
        dispatch(hidenLoading())

      }
    }
}
export const listFilmDangChieu =()=>{
      return{ 
        type:SET_FILM_DANG_CHIEU
      }
}
export const listFilmSapChieu =()=>{
  return{ 
    type:SET_FILM_DANG_CHIEU
  }
}

export const themPhimUpLoadHinhAnhAction = (formData)=>{
  return async (dispatch) =>{
    try {
      dispatch(displayLoading())
      const result = await quanlyPhimService.themPhimUpLoadHinh(formData)
      
      dispatch(hidenLoading())
    }
    catch (err) {
      console.log(err.response?.data)
      dispatch(hidenLoading())
    }
  }
}
export const layThongTinPhimAction = (maPhim)=>{
  return async (dispatch) =>{
    try{
      
      dispatch(displayLoading())
      const result = await quanlyPhimService.layThongTinPhim(maPhim)
      dispatch({
        type:SET_THONG_TIN_FILM,
        thongTinPhim:result.data.content
      })
      
   
      dispatch(hidenLoading())
    }
    catch(err){
      console.log(err.response?.data)
      dispatch(hidenLoading())

    }
  }
}
export const capNhatPhimUpLoadAction =(formData) =>{
  return async (dispatch) =>{
    try{
      
      // dispatch(displayLoading())
      const result = await quanlyPhimService.capNhatPhimUpLoad(formData);
      console.log(result.data.content)
      dispatch(hidenLoading())
      // dispatch(layDanhSachPhimAction())
      
      history.push('/admin/films')
    }
    catch(err){
      console.log(err)
    }

  }
}
export const XoaPhimAction =(maPhim) =>{
  return async (dispatch) =>{
    try{
      
      // dispatch(displayLoading())
      const result = await quanlyPhimService.xoaPhim(maPhim);
      Swal.fire({
        icon: "error",
        title: "hoàn tất",
        text: "Bạn đã xóa phim thành công",
      });
      dispatch(layDanhSachPhimAction())
    }
    catch(err){
      console.log(err.response?.data)
    }

  }
}
