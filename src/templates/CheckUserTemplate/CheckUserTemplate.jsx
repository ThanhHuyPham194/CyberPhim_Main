import { useEffect } from 'react';
import { Route } from 'react-router-dom'
export const CheckUserTemplates = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0,0)
}) 
  return < Route {...restProps} render={(propsRoute) => {
   // propsRoute trả ra props.localtion ,props.match, props.hisrory
    return <>
        <div style={{backgroundImage: 'url(http://tixvn.click/static/media/backapp.b46ef3a1ce082cecae80.jpg)',backgroundSize:'contain',
    backgroundAttachment: 'fixed',
    height: '100%',
    width: '100%',paddingBottom: '30%'}}
    className="userCheck"
    >
         
    
    
       <Component {...propsRoute} />
        </div>
    </>


  }} />
}