import React, { useEffect, useState ,Fragment} from 'react'
import { Form, Button, Select, DatePicker, Space, InputNumber } from 'antd';
import { quanLyRapService } from '../../../../services/QuanLyRapServices';
import {quanLydatVeServices} from '../../../../services/QuanLyDatVeService';
import { useFormik } from 'formik';
import moment from 'moment';
import {Back} from '../Film'
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Showtime = (props) => {
  const {tenphim,id} = props.match.params;
  const fomik = useFormik({
    initialValues:{
      maPhim:id,
      ngayChieuGioChieu:'',
      giaVe:'',
      maRap:''
    },
    onSubmit:async (value) =>{
      try {
        let result = await quanLydatVeServices.taoLichChieu(value);
      }
      catch (err) {
        console.log(err.response?.data)
      }
    }
  })


  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
          ...state,
          heThongRapChieu: result.data.content
        })
      }
      catch (err) {
        console.log(err.response?.data)
      }
    }
    fetchData()
  }, [])



  


  const { RangePicker } = DatePicker;
  const onChangeDate = (value, dateString) => {
    fomik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD-MM-YYYY HH:mm:ss'))

  }

  const onOk =(value) => {
    fomik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD-MM-YYYY HH:mm:ss'))

  }
  const onChangInputNumber = (value) => {
    fomik.setFieldValue('giaVe',value)
  }
  const hanldelChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    }
    catch (err){
      console.log(err.response?.data)
    }
  }
  const hanldelChangeCumRap = (value)=>{
    fomik.setFieldValue('maRap',value)
  }
  const lsHeThongRap = ()=>{
   return state.heThongRapChieu?.map((thrap, index) => ({ label: thrap.tenHeThongRap, value: thrap.tenHeThongRap }
      ))
  }
  const lsCumRap = ()=>{
    return state.cumRapChieu?.map((cumrap, index) => ({ label: cumrap.tenCumRap, value: cumrap.maCumRap }
       ))
   }
  return (
    <Fragment>
      <Back />
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onSubmitCapture = {fomik.handleSubmit} 
    >
      <h3 style={{fontSize:25,fontWeight:'bold'}}>Tạo Lịch Chiếu - {tenphim}</h3>
      <Form.Item
        label="Hệ Thống Rạp"

      >
        <Select options={lsHeThongRap()} onChange={hanldelChangeHeThongRap} placeholder="Vui lòng Chọn hệ thống rạp" />
      </Form.Item>
      <Form.Item
        label="Hệ Thống Cụm Rạp"

      >
        <Select options={lsCumRap()} onChange={hanldelChangeCumRap} placeholder="Vui lòng Chọn cụm rạp" />
      </Form.Item>
      <Form.Item
        label="Ngày chiếu Giờ chiếu"

      >
        <Space direction="vertical" size={12}>
          <DatePicker showTime onChange={onChangeDate} onOk={onOk} format="DD-MM-YYYY HH:mm:ss" />
        </Space>
      </Form.Item>

      <Form.Item
        label="Giá vé "

      >
        <InputNumber min={75000} max={150000}  onChange={onChangInputNumber} />
      </Form.Item>
      <Form.Item
        label="CHỌN"

      >
        <Button htmlType='submit' style={{ margin: 0 }}>Tạo lịch chiếu</Button>
      </Form.Item>


    </Form>
    </Fragment>
  );
};

export default Showtime;
