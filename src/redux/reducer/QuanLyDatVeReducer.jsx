import { SET_CHI_TIET_PHONG_VE, DAT_GHE, CHON_GHE, DAT_VE_HOAN_TAT, CHUYEN_TABS, CHUYEN_TABS_ACTIVE } from '../types/QuanLyDatVeType'
import { ThongTinLichChieu } from '../../_core/models/ThongTinPhongVe'
import Swal from 'sweetalert2'

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    tabsActive: 1,
    danhSachGheKhachDat: []
}
export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }
        case CHON_GHE: {
            // cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) {
                // nếu có tồn tại thì ta xóa nó đi
                danhSachGheCapNhat.splice(index, 1)
            } else {
                state.danhSachGheDangDat.length < 6
          ? danhSachGheCapNhat.push(action.gheDuocChon)
          : Swal.fire({
              icon: "error",
              title: "Không được phép...!",
              text: "Bạn chỉ được đặt tối đa 6 vé cùng lúc.",
              footer:
                'Nếu có thắc mắc xin vui lòng liên hệ &nbsp;<a href="tel:+19001234">19001234</a>',
            });

                
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }



        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = []
            return { ...state }
        }
        case CHUYEN_TABS: {
            state.tabsActive = 2;
            return { ...state }
        }
        case CHUYEN_TABS_ACTIVE: {
            state.tabsActive = action.number;
            return { ...state }
        }
        case DAT_GHE: {
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            return { ...state }
        }

        default: return { ...state }
    }
}