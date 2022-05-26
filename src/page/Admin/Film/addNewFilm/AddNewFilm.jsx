import React, { Fragment, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import {useFormik} from 'formik';
import moment from 'moment';
import {GROUPID} from '../../../../util/settings/Config'
import { useDispatch } from 'react-redux';
import { themPhimUpLoadHinhAnhAction } from '../../../../redux/actions/QuanLyFilmAction';
import { Back } from '../Film';
const AddNewFilm = () => {
  const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState('default');
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDetaPicker =(values)=>{
    formik.setFieldValue('ngayKhoiChieu', moment(values).format("DD/MM/YYYY"));
  }
  const handleChangeSwitchandInput = (name) => {
    return (value)=>{

      formik.setFieldValue(name, value);
    }

  }
  const handleChangeFile = (e) =>{
    // e.target.file có thể chọn nhiều file nên chỉ lấy cái đầu tiên vào formik
    let file = e.target.files[0];

    if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === ' image/svg+xml' || file.type === ' image/jpg' || file.type === ' image/gif'){
      
      // tạo đối tượng đọc file 
      let reader = new FileReader();
      // hàm đọc file và trả ra url
      reader.readAsDataURL(file)
      // trả ra url dùng onLoad để trả ra url
      reader.onload = (e) =>{
        setImg(e.target.result)
      }
      // đọc file rồi lưu vào useFormik
      formik.setFieldValue('hinhAnh',file)
    }
  }
  const formik = useFormik({
    initialValues:{
      tenPhim:'',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      sapChieu:false,
      dangChieu: false,
      hot: false,
      danhGia:0,
      hinhAnh:{},
      maNhom:''
    },
    onSubmit: (values, { resetForm }) => {
      let formData = new FormData();
      values.maNhom = GROUPID;
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append('File', values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themPhimUpLoadHinhAnhAction(formData));
      resetForm();
    },
  });

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Vui lòng chọn ngày chiếu!",
      },
    ],
  };
  return (
    <Fragment>
     
    <Back />
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
        <h3 style={{fontSize:25}}>Thêm phim mới</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name='tenPhim' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <TextArea rows={4} name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu" {...config}>
        <DatePicker name='ngayKhoiChieu' onChange= {handleChangeDetaPicker} format={"DD/MM/YYYY"} />
      </Form.Item>
      <Form.Item label="Sắp Chiếu" valuePropName="checked">
        <Switch name='sapChieu' onChange={handleChangeSwitchandInput('sapChieu' )} />
      </Form.Item>
      <Form.Item label="Đang Chiếu" valuePropName="checked">
        <Switch name='dangChieu' onChange={handleChangeSwitchandInput("dangChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch name='hot' onChange={handleChangeSwitchandInput('hot')} />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber onChange = {handleChangeSwitchandInput('danhGia')} min={1} max={10}/>
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <Input  type= 'File' onChange={handleChangeFile} accept='image/png, image/svg+xml,image/jpeg' />
        <br/>
        <img width={250} alt='..' src= {img}  />
      </Form.Item>
       <Form.Item label="Xác Nhận">
        <button type= 'submit' style={{margin:0}}>Thêm Phim</button>
      </Form.Item>
    </Form>
     
    </Fragment>
  );
};

export default AddNewFilm ;