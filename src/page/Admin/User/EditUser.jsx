import React, { useEffect, useState, Fragment } from 'react';
import { Back } from '../Film/Film';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungDanngNhapAction, capNhatThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction'
import Swal from "sweetalert2";
import { GROUPID } from '../../../util/settings/Config'

const EditUser = (props) => {
    const { TextArea } = Input;
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinNguoiDungCapNhat } = useSelector(state => state.QuanLyNguoiDungReducer)
    console.log(thongTinNguoiDungCapNhat.taiKhoan)
    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        dispatch(layThongTinNguoiDungDanngNhapAction(thongTinNguoiDungCapNhat.taiKhoan))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungCapNhat.taiKhoan,
            matKhau: thongTinNguoiDungCapNhat.matKhau,
            hoTen: thongTinNguoiDungCapNhat.hoTen,
            email: thongTinNguoiDungCapNhat.email,
            soDt: thongTinNguoiDungCapNhat.soDT,
            maNhom: '',
            maLoaiNguoiDung: thongTinNguoiDungCapNhat.maLoaiNguoiDung
        },
        onSubmit: (values) => {
            let formData = new FormData();
            values.maNhom = GROUPID;
            console.log( formData.values,values);
            

            dispatch(capNhatThongTinNguoiDungAction(formData));
        },
    });

    ;
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
                <h3 style={{ fontSize: 25 ,color: "white" }}>Thay đổi thông tin tài khoản</h3>
                <Form.Item label="Tài Khoản" >
                    <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Mật Khẩu" >
                    <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Email" >
                    <Input name='email' onChange={formik.handleChange} value={formik.values.email} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Họ và Tên" >
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} className="form-control bg-transparent text-center" />
                </Form.Item>
                <Form.Item label="Số điện thoại" >
                    <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} className="form-control bg-transparent text-center" />
                </Form.Item>

                <Form.Item label="Xác Nhận">
                    <Button htmlType='submit'  style={{ margin: 0 }}>Cập Nhật Thông tin</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default EditUser;