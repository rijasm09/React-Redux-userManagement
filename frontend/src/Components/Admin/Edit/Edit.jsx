import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { adminUpdateReducer } from '../../../REDUX/Reducers/adminReducer';
import { adminUpdateUser } from '../../../REDUX/Actions/adminAction';
// import Header from './Header'
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import 'semantic-ui-css/semantic.min.css'
import { Alert, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { adminLogout } from '../../../REDUX/Actions/adminAction'
import { adminHomeAction } from '../../../REDUX/Actions/adminAction';



function Edit() {

  const state = useSelector((state) => state.adminUpdate.selectedUser)
  console.log('edited state EDITJSX', state);

  const { register, handleSubmit, formState: { errors } } = useForm();


  const [firstname, setfirstname] = useState(state.firstname)
  const [lastname, setlastname] = useState(state.lastname)
  const [email, setEmail] = useState(state.email)
  const [id, setid] = useState(state._id)

  const [inputFirstName, setInputFirstName] = useState(state.firstname)
  const [inputLastName, setInputLastName] = useState(state.lastname)
  const [inputEmail, setInputEmail] = useState(state.email)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const admindelete = useSelector((state) => state.adminDelete)
  let { deleteloading, deleteerror, deletedata } = admindelete
  const adminblock = useSelector((state) => state.adminBlock)
  let { blockloading, blockerror, blockdata } = adminblock;

  const [showL, setShowL] = useState(false)

  useEffect(() => {
    let admindata = localStorage.getItem("adminInfo")
    if (admindata != null) {
      dispatch(adminHomeAction())
    } else {
      navigate("/admin/login")
    }

    setTimeout(() => {
      deletedata = false
    }, 3000);

  }, [blockdata, deletedata])





  const changeFirstName = e => {
    setInputFirstName(e.target.value)
    setfirstname(e.target.value)
  }
  const changeLastName = e => {
    setInputLastName(e.target.value)
    setlastname(e.target.value)
  }

  const changeEmail = e => {
    setInputEmail(e.target.value)
    setEmail(e.target.value)
  }

  const handleUpdate = (e) => {

    const oldEmail = state.email
    // console.log(firstname + "TJIS IS THE OLD NA ME");
    dispatch(adminUpdateUser(id, firstname, lastname, email, oldEmail))
    let editInfo = localStorage.getItem('editedUser')
    if (editInfo) {
      navigate('/admin/')
    }
  }

  const logout = () => {
    // dispatch(adminLogout())
    // navigate("/admin/login")
    setShowL(true)
  }
  const handleLogout = (id) => {
    dispatch(adminLogout())
    navigate("/admin/login")
    setShowL(false)
  }
  const handleCloseL = () => {
    setShowL(false)
  }

  return (
    <div>
      <>
      <Button className='btn btn-warning' style={{ right: 2, marginRight: 10 }} onClick={logout}> <i class="fa-solid fa-power-off"></i> LOGOUT</Button>

        <div className='bagrounds' >

          <div className='forms' >

            <div className='formcontainers '>

              <Form onSubmit={handleSubmit(handleUpdate)}>

                <h1>Edit User Profile</h1>
                <br />

                <Form.Field>
                  <input
                    placeholder='First Name'
                    type="text"
                    value={inputFirstName}
                    {...register("firstName", { required: true, maxLength: 20 })}
                    onChange={changeFirstName}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.firstName && <p>Please check the First Name</p>}</strong>

                <Form.Field>
                  <input
                    placeholder='Last Name'
                    type="text"
                    value={inputLastName}
                    {...register("lastName", { required: true, maxLength: 20 })}
                    onChange={changeLastName}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.lastName && <p>Please check the Last Name</p>}</strong>

                <Form.Field>
                  <input
                    placeholder='Email'
                    type="email"
                    value={inputEmail}
                    {...register("email", {
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    onChange={changeEmail}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.email && <p>Please check the email</p>}</strong>

                <Button className='button1' style={{ backgroundColor: '#03fcdb' }} type='submit' >Submit</Button>
                <Link to={'/admin'}>
                  <Button className='btn btn-sucess' style={{ right: 0, }} > <i class="fa-solid fa-power-off"></i> HOME</Button>
                </Link>
              </Form>

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

            </div>

          </div>
        </div>
      </>
    </div>

  )
}

export default Edit