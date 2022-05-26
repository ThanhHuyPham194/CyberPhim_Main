import {DISPLAY_LOADING,HIDEN_LOADING} from '../types/LoadingType'

export const displayLoading = () =>{
    return{ 
        type:DISPLAY_LOADING
    }
}
export const hidenLoading = () =>{
    return{ 
        type:HIDEN_LOADING
    }
}