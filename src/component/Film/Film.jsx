import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
export default function Film({ film }) {
  const [show, setShow] = useState(false);
  return (
    <div className='card-film p-2' >
      <div style={{position:'relative',}}>
        <img src={film.hinhAnh}
          alt={film.tenPhim}
          onError={(e) => (e.target.onerror = null, e.target.src = "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8dCggmhXCsTbEyIIIKJXMoyBDj4gMLwLdzQ&usqp=CAU")}
          />
        <div className='card-film_hover-trailer'>
          <button className='btn card-film_hover-trailer-button' onClick={() => setShow(true)} >
            <i className="fa fa-play-circle"></i>
          </button>
         
        </div>
      </div>
      <div className='card-film-body'>
        <div className='card-film-name '>
          <p>18+</p>
          {film.tenPhim.length > 50 ? <span >{film.tenPhim.slice(0, 50) + "..."}</span> : <span>{film.tenPhim}</span>}
        </div>
        <p className='card-film_p'>{film.moTa.length > 60 ? <span >{film.moTa.slice(0, 60) + "..."}</span> : <span>{film.moTa}</span>} </p>
        <NavLink to ={`/detail/${film.maPhim}`} className="btn card-film_button-booking">Mua Vé</NavLink>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        <iframe
            width="100%"
            height="100%"
            src={film.trailer + `?autoplay=1`}
            title="s"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Modal.Header>
      </Modal>
    </div>
  )
}
