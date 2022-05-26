import axios from 'axios';
import {SET_CAROUSEL} from '../types/CarouselType'
import {quanlyPhimService} from '../../services/QuanLyPhimServices'
import { displayLoading, hidenLoading } from '../actions/LoadingAction';

export const getCarouselAction =async (dispatch) =>{
    try{
      dispatch(displayLoading())
      const result = await quanlyPhimService.LayDanhSachBanner()
      // đưa lên reducer is
      dispatch({
        type: SET_CAROUSEL,
        arrBanner:result.data.content
      })
      dispatch(hidenLoading())
    }
    catch(err){
      console.log(err);
      dispatch(hidenLoading())
    }
  }