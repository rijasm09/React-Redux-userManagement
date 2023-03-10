import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userSignup } from '../../../REDUX/Actions/userActions'
import './Signup.css'
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";


function Signup() {


  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const Signup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = Signup;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault()
    dispatch(userSignup(firstname, lastname, email, password))
  }

  // const handlesubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(userSignup(firstname, lastname, email, password))
  // }

  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo")
    if (userinfo) {
      navigate("/")
    }
    console.log("HEHHEH");
    if (userInfo) {
      navigate("/login")
    }
  }, [userInfo])
  console.log(userInfo);

  return (
    <div>
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

                <Link to={'/login'}>
                  <button className='button2 mt-2' style={{ backgroundColor: 'black' }}>Login</button>
                </Link>
              </Form>


            </div>

          </div>
        </div>
      </>
    </div>
  )
}

export default Signup
