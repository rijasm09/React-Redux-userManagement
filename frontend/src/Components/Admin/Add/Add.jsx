import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userSignup } from '../../../REDUX/Actions/userActions'
import './Add.css'
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { adminLogout } from '../../../REDUX/Actions/adminAction'
import { adminHomeAction } from '../../../REDUX/Actions/adminAction';



function addUser() {


  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //   const Signup = useSelector(state => state.userSignup)
  //   const { loading, error, userInfo } = Signup;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showL, setShowL] = useState(false)

  const admindelete = useSelector((state) => state.adminDelete)
  let { deleteloading, deleteerror, deletedata } = admindelete
  const adminblock = useSelector((state) => state.adminBlock)
  let { blockloading, blockerror, blockdata } = adminblock;

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


  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault()
    dispatch(userSignup(firstname, lastname, email, password))
    navigate("/admin")
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    // dispatch(userSignup(firstname, lastname, email, password))
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
                <Button className='btn btn-warning' style={{ right: 2, marginRight: 10 }} onClick={logout}> <i class="fa-solid fa-power-off"></i> LOGOUT</Button>

      <>
      
        <div className='bagrounds' >


          <div className='forms' >
            

            <div className='formcontainers '>
              

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                  {/* <label>First Name</label> */}
                  <input
                    placeholder='First Name'
                    type="text"
                    {...register("firstName", { required: true, maxLength: 20 })}
                    onChange={(e) => {
                      setfirstname(e.target.value)
                    }}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.firstName && <p>Please check the First Name</p>}</strong>

                <Form.Field>
                  {/* <label>Last Name</label> */}
                  <input
                    placeholder='Last Name'
                    type="text"
                    {...register("lastName", { required: true, maxLength: 20 })}
                    onChange={(e) => {
                      setlastname(e.target.value)
                    }}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.lastName && <p>Please check the Last Name</p>}</strong>

                <Form.Field>
                  {/* <label>Email</label> */}
                  <input
                    placeholder='Email'
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.email && <p>Please check the email</p>}</strong>

                <Form.Field>
                  {/* <label>Password</label> */}
                  <input
                    placeholder='Password'
                    type="password"
                    {...register("password", { required: true, pattern: /^.{6,15}$/ })}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </Form.Field>
                <strong style={{ color: "red" }}>{errors.password && <p>Please check the Password</p>}</strong>

                <Button className='button1' style={{ backgroundColor: '#03fcdb' }} type='submit'>Submit</Button>
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

export default addUser
