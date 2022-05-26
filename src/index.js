import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import './index.css';
import App from './App';
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Provider} from 'react-redux'
import {store} from './redux/configStore'
import reportWebVitals from './reportWebVitals';
import {DOMAIN} from '../src/util/settings/Config';
import * as signalR from "@aspnet/signalr";

// import đa ngôn ngữ
import './i18n'
const root = ReactDOM.createRoot(document.getElementById('root'));
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

  connection.start().then(() => {
    root.render(
  
        <Provider store={store}>
    
        <App />
    </Provider>
    
    )

  })
  .catch((err) => {
      console.log(err)
  })
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
