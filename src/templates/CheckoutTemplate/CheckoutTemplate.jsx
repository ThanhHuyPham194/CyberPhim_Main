import { useEffect } from 'react';
import {Redirect, Route} from 'react-router-dom'
import { USER_LOGIN } from '../../util/settings/Config';

 const CheckoutTemplate = (props) =>{
    const {Component,...restProps} = props;
    useEffect(() => {
        window.scrollTo(0,0)
    })
    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect replace to='/login' />
    }

   
    
    return < Route {...restProps} render={(propsRoute)=>{ // propsRoute trả ra props.localtion ,props.match, props.hisrory
        return  <>
            <Component {...propsRoute} />
            </>
        

    }}/>
 }
 export default CheckoutTemplate;