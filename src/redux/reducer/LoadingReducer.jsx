import {HIDEN_LOADING,DISPLAY_LOADING} from '../types/LoadingType'

const stateDefault = {
    isLoading: false,
}

export const LoadingReducer = ( state= stateDefault, action) =>{
    switch(action.type){
        case DISPLAY_LOADING:{
            state.isLoading = true;
            return {...state}
        }
        case HIDEN_LOADING:{
            state.isLoading = false;
            return {...state}
        }

        default: return { ...state }
    }
}