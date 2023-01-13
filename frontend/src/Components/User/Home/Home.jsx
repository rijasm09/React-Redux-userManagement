import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Container, Form, Row, Modal } from 'react-bootstrap'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

import { userHome, userlogout } from '../../../REDUX/Actions/userActions'
import './Home.css'
function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const home = useSelector(state => state.userHome)
  const { loading, error, homedata } = home;
  const [showL, setShowL] = useState(false)


  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo")
    console.log(userinfo);
    if (userinfo != null) {
      dispatch(userHome())
    } else {
      navigate("/login")
    }
  }, [])

  const userLogout = () => {
    // dispatch(userlogout())
    // navigate("/login")
    setShowL(true)
  }
  const handleCloseL = () => {
    setShowL(false)
  }
  const handleLogout = () => {
    dispatch(userlogout())
    navigate("/login")
    setShowL(false)
  }

  return (

    <div>
      <section>

        <MDBCard style={{ width: '30%' }} >

          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage style={{ width: '100%' }} src={homedata ? homedata.photo ? homedata.photo : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' : ''} alt="" />

            <a>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </MDBRipple>

          <MDBCardBody>
            <MDBCardTitle>{homedata ? homedata.firstname : ''} {homedata ? homedata.lastname : ''}</MDBCardTitle>

            <Link to={'/profile'} ><MDBBtn className='mx-2' color='secondary'>
              profile
            </MDBBtn></Link>

            <MDBBtn className='mx-2' color='danger' onClick={userLogout}>
              Logout
            </MDBBtn>
          </MDBCardBody>

        </MDBCard>

        {/* USER LOGOUT MODAL */}
        <Modal show={showL} onHide={handleCloseL} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to Logout..?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { handleLogout() }}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleCloseL}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  )
}

export default Home
