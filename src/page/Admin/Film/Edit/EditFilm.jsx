import React, { useEffect, useState ,Fragment} from 'react';
import {Back} from '../Film'
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
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUpLoadAction, layThongTinPhimAction} from '../../../../redux/actions/QuanLyFilmAction';
import Swal from "sweetalert2";

const Edit = (props) => {
    const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState('default');
  const [img, setImg] = useState(null);
  const {thongTinPhim} = useSelector(state=> state.QuanLyFilmReducer)
  const dispatch = useDispatch();
  useEffect(()=>{
      let {id} = props.match.params;
      dispatch(layThongTinPhimAction(id))
  },[])
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDetaPicker = (value) => {
    formik.setFieldValue("ngayKhoiChieu", moment(value));
  };
  const handleChangeSwitchandInput = (name) => {
    return (value)=>{

      formik.setFieldValue(name, value);
    }

  }
  const handleChangeFile = async (e) =>{
    // e.target.file có thể chọn nhiều file nên chỉ lấy cái đầu tiên vào formik
    let file = e.target.files[0];

    if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === ' image/svg+xml' || file.type === ' image/jpg' || file.type === ' image/gif'){
      // đọc file rồi lưu vào useFormik
      await formik.setFieldValue('hinhAnh',file)
      // tạo đối tượng đọc file 
      let reader = new FileReader();
      // hàm đọc file và trả ra url
      reader.readAsDataURL(file)
      // trả ra url dùng onLoad để trả ra url
      reader.onload = (e) =>{
        console.log(e.target.result);
        setImg(e.target.result)
      }
      
    }
    console.log(file);
  }
  const formik = useFormik({
      enableReinitialize:true,
    initialValues:{
        maPhim: thongTinPhim?.maPhim,
        tenPhim: thongTinPhim?.tenPhim,
        trailer: thongTinPhim?.trailer,
        moTa: thongTinPhim?.moTa,
        ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
        dangChieu: thongTinPhim?.dangChieu,
        sapChieu: thongTinPhim?.sapChieu,
        hot: thongTinPhim?.hot,
        danhGia: thongTinPhim?.danhGia,
        hinhAnh: null,
      maNhom:''
    },
    onSubmit: (values) => {
        let formData = new FormData();
        values.maNhom = GROUPID;
        if (
          formik.initialValues.tenPhim === values.tenPhim &&
          formik.initialValues.trailer === values.trailer &&
          formik.initialValues.moTa === values.moTa &&
          formik.initialValues.ngayKhoiChieu === values.ngayKhoiChieu &&
          formik.initialValues.dangChieu === values.dangChieu &&
          formik.initialValues.sapChieu === values.sapChieu &&
          formik.initialValues.hot === values.hot &&
          formik.initialValues.danhGia === values.danhGia &&
          formik.initialValues.hinhAnh === values.hinhAnh
        ) {
          Swal.fire({
            icon: "error",
            title: "Cảnh báo",
            text: "Bạn chưa chỉnh sửa thông tin phim!",
          });
          dispatch(layThongTinPhimAction());
          return;
        }
        for (let key in values) {
          if (key !== "hinhAnh") {
            formData.append(key, values[key]);
          } else {
            if (values.hinhAnh !== null) {
              formData.append("File", values.hinhAnh, values.hinhAnh.name);
            }
          }
        }
  
        dispatch(capNhatPhimUpLoadAction(formData));
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
        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange}  value={formik.values.trailer} />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <TextArea rows={4} name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu" {...config}>
        <DatePicker  name='ngayKhoiChieu' value ={moment(formik.values.ngayKhoiChieu)} onChange= {handleChangeDetaPicker} format={"DD/MM/YYYY"} />
      </Form.Item>
      <Form.Item label="Sắp Chiếu" valuePropName="checked">
        <Switch name='sapChieu' onChange={handleChangeSwitchandInput('sapChieu' )} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Đang Chiếu" valuePropName="checked">
        <Switch name='dangChieu' onChange={handleChangeSwitchandInput("dangChieu")} checked={formik.values.dangChieu}  />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch name='hot' onChange={handleChangeSwitchandInput('hot')}  checked= {formik.values.hot} />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber onChange = {handleChangeSwitchandInput('danhGia')} value= {formik.values.danhGia} min={1} max={10}/>
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <Input  type= 'File' onChange={handleChangeFile}  accept='image/png, image/svg+xml,image/jpeg' />
        <br/>
        <img width={250} alt='..' src= {img == null ? thongTinPhim.hinhAnh : img}  />
      </Form.Item>
       <Form.Item label="Xác Nhận">
        <button type= 'submit' style={{margin:0}}>Cập Nhật Phim</button>
      </Form.Item>
    </Form>
    </Fragment>
  );
};

export default Edit ;