
import {Route} from 'react-router-dom'
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer'
import { useEffect } from 'react';

 export const HomeTemplates = (props) =>{
    const {Component,...restProps} = props;
    useEffect(() => {
        window.scrollTo(0,0)
    })
    return < Route {...restProps} render={(propsRoute)=>{ // propsRoute trả ra props.localtion ,props.match, props.hisrory
        return  <>
            <Header {...propsRoute}  />
            <Component {...propsRoute} />
           <Footer {...propsRoute} />
            </>
        

    }}/>
 }