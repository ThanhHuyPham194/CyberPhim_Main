import {LIST_FILM,SET_FILM_DANG_CHIEU,SET_FILM_SAP_CHIEU, SET_THONG_TIN_FILM,} from '../types/QuanLyPhimType';
import {SET_CHI_TIET_PHIM} from '../types/QuanLyRapType'

const stateDefault = {
    arrFilm :[
          
          
    ],
    dangChieu:true,
    sapChieu:true,
    arrFilmDefaul:[],
    filmDetail:{},
    thongTinPhim:{}
}

export const QuanLyFilmReducer = (state= stateDefault,action) =>{
    switch(action.type){
        case LIST_FILM :{
            state.arrFilm = action.arrFilm
            state.arrFilmDefaul =state.arrFilm ;
            return { ...state}
        }
        case SET_FILM_DANG_CHIEU :{
            state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefaul.filter(film =>film.dangChieu === state.dangChieu);
            return { ...state}

        }
        case SET_FILM_SAP_CHIEU :{
            state.sapChieu = !state.sapChieu;
            state.arrFilm = state.arrFilmDefaul.filter(film =>film.sapChieu === state.sapChieu);
            return { ...state}

        }
        case SET_CHI_TIET_PHIM:{
            state.filmDetail= action.filmDetail;
            return { ...state}
        }
        case SET_THONG_TIN_FILM :{
            state.thongTinPhim = action.thongTinPhim;
            return { ...state}
        }

        default: return { ...state}
    }
}