import React from 'react'
import './Adminhome.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Container, Form, Row, Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import { adminHomeAction, adminuserBlock, admindeleteUser, adminLogout, adminSearch } from '../../../REDUX/Actions/adminAction'
import { useState } from 'react'
import { adminUpdate } from '../../../REDUX/Actions/adminAction'
import { Link } from 'react-router-dom'


function Adminhome() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchkeyword, setSearchKeyword] = useState('')
  const adminsearch = useSelector((state) => state.adminSearch)
  let { searchloading, searcherror, searchresult } = adminsearch
  console.log(searchresult);
  const adminhome = useSelector((state) => state.adminHome)
  let { loading, error, adminHome } = adminhome;
  const adminblock = useSelector((state) => state.adminBlock)
  let { blockloading, blockerror, blockdata } = adminblock;
  const admindelete = useSelector((state) => state.adminDelete)
  let { deleteloading, deleteerror, deletedata } = admindelete
  const [selectedUser, setSelectedUser] = useState()
  const [deleteId, setDeleteId] = useState("")
  const [deleteIdB, setDeleteIdB] = useState("")
  const [show, setShow] = useState(false)
  const [showB, setShowB] = useState(false)
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

  const blockuser = (id) => {
    console.log("id in block", id);
    setDeleteIdB(id)
    setShowB(true)
    // dispatch(adminuserBlock(id))
  }

  const deleteuser = (id) => {
    console.log(id);
    setDeleteId(id)
    setShow(true)
  }

  const logout = () => {
    // dispatch(adminLogout())
    // navigate("/admin/login")
    setShowL(true)
  }

  const handleClose = () => {
    setShow(false)
  }
  const handleCloseB = () => {
    setShowB(false)
  }
  const handleCloseL = () => {
    setShowL(false)
  }

  const handleDeleteItem = (id) => {
    dispatch(admindeleteUser(deleteId))
    setShow(false)
  }
  const handleBlockItem = (id) => {
    console.log("after block", id);
    console.log("required id", deleteIdB);
    dispatch(adminuserBlock(deleteIdB))
    setShowB(false)
  }
  const handleLogout = (id) => {
    dispatch(adminLogout())
    navigate("/admin/login")
    setShowL(false)
  }

  const searchuser = () => {
    dispatch(adminSearch(searchkeyword))

  }
  if (searchresult) {
    adminHome = searchresult

  }
  const settingsearch = (e) => {
    console.log("searchdata",e);
    if (e.length == 0) {
      setSearchKeyword(e)
      dispatch(adminSearch(''))
    } else {
      setSearchKeyword(e)
      dispatch(adminSearch(searchkeyword))
    }
  }

  console.log(blockloading);

  const userDetails = (data) => {
    setSelectedUser(data)
    dispatch(adminUpdate(data))
    navigate('/admin/edit-user')
  }


  return (

    <div className='adminhomemain'>



      <h2>ADMIN HOME </h2>
      <Button className='btn btn-warning' style={{ right: 2, marginRight:10  }} onClick={logout}> <i class="fa-solid fa-power-off"></i> LOGOUT</Button>
      <Link to={'/admin/add-user'}>
      <Button className='btn btn-sucess' style={{ right: 0 }} > <i class="fa-solid fa-power-off"></i> ADD USER</Button>
      </Link>
      <Container>

        {
          deletedata ? <h3 style={{ color: "red" }}>User Deleted Successfully</h3> : ''
        }
        <Form style={{ width: "50%" }} className="d-flex mt-2 mb-2">
          <Form.Control
            type="search"
            onChange={(e) => { settingsearch(e.target.value) }}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button onClick={searchuser} variant="outline-success">Search</Button>
        </Form>
        {
          adminHome ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>ACCESS</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                adminHome ? adminHome.map((data, i) => {
                  return (

                    <tr>
                      <td>{i + 1}</td>
                      <td>{data.firstname} {data.lastname}</td>
                      <td>{data.email}</td>
                      {
                        console.log('DATA', data._id)
                      }
                      <td> {blockloading ? <p>Loading</p> : <Button onClick={() => blockuser(data._id)}
                        style={data.status ? { backgroundColor: "red", width: "100px" } : { backgroundColor: "green", width: "100px" }}>
                        {data.status ? 'Block' : 'Unblock'} </Button>} </td>

                      <td><Button key={data._id} onClick={(e) => {
                        console.log("clicked user", data);
                        userDetails(data)
                      }}><i class="fas fa-edit"></i></Button></td>

                      <td><Button onClick={() => deleteuser(data._id)} style={{ backgroundColor: "red" }}>Delete</Button></td>

                      {/* USER DELETE MODAL */}
                      <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => handleDeleteItem(data._id)}>
                            Ok
                          </Button>
                          <Button variant="primary" onClick={handleClose}>
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      {/* USER BLOCK MODAL */}
                      <Modal show={showB} onHide={handleCloseB} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Block Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure....?</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => { handleBlockItem() }}>
                            Yes
                          </Button>
                          <Button variant="primary" onClick={handleCloseB}>
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>

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


                    </tr>



                  )
                }) : ''
              }
            </tbody>
          </Table> : ''
        }
      </Container>
    </div>
  )
}

export default Adminhome
