import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomeMenu from './HomeMenu/HomeMenu';
import New from '../New/New'
import MultipleItems from '../../component/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyFilmAction'
import { layDanhSachCumRapAction } from '../../redux/actions/QuanLyRapAction'
import Contact from '../Contact/Contact';
import HomeCarousel from '../../templates/HomeTemplates/Layout/HomeCarousel/HomeCarousel';
import Register from '../Register/Register';
export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyFilmReducer)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachPhimAction());
        dispatch(layDanhSachCumRapAction())
    }, [])
    return (
        <div >
            <HomeCarousel />
            <div className='container' style={{maxWidth:1200}}>
                {/* render carousel list film */}
                <MultipleItems arrFilm={arrFilm} />
                <HomeMenu heThongRapChieu={heThongRapChieu} />
                <New />
            </div>
            <Contact />
        </div>
    )
}
