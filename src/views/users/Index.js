/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  NavLink,
  Col,
  Button
} from "reactstrap";
// core components

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const UserIndex = () => {
  const history = useHistory()
  const storedJwt = localStorage.getItem('token');
  const [jwt] = useState(storedJwt || null);

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [userId, setUserId] = useState();
  const [isOpen, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [apiMessage, setApiMessage] = useState();
  const [isOpen2, setOpen2] = useState(false);

  const getUsers = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user`,
    {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
    })

    const data = await res.json()

    console.log(data)

    if (data.code === "200") {
        
        setUsers(data.data)
        setError(false)
        console.log(users)
        return
    } else if (data.code === "500") {
      setAlertStatus({"warning": true})
      setApiMessage(data.message)
      setOpen(true)
      history.push("/auth/login")
    } else {
      setAlertStatus({"warning": true})
      setApiMessage(data.message)
      setOpen(true)
    }

    setError(data.error)
  }

  useEffect(() => {
      setLoading(true)
      getUsers(jwt)
      setLoading(false)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`,
    {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': jwt
        }
    })

    const data = await res.json()

    console.log(data)

    if (data.code === "200") {
        
        getUsers(jwt)
        setError(false)
        
        return
    } else if (data.code === "500") {
      setAlertStatus({"warning": true})
      setApiMessage(data.message)
      setOpen(true)
      history.push("/auth/login")
    } else {
      setAlertStatus({"warning": true})
      setApiMessage(data.message)
      setOpen(true)
    }

    setError(data.error)
  }

  return (
    <>
    <SweetAlert      
            {...alertStatus}
            show={isOpen2} //Notice how we bind the show property to our component state
            title="Info"
            onConfirm={() => setOpen(false)}
            timeout={2000}
            showConfirmButton={false}
        >
            {apiMessage}
        </SweetAlert>

        <SweetAlert
        warning
        showCancel
        show={isOpen} //Notice how we bind the show property to our component state
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => deleteUser()}
        onCancel={() => {
            console.log("bye");
            setOpen(false); // Don't forget to close the modal
        }}
        focusCancelBtn
        >
        You will not be able to recover this action
        </SweetAlert>
      <div className="header bg-gradient-info pb-6 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="text-white mb-0">USERS</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      tag={Link}
                      to="/admin/user/add"
                      color="primary"
                      size="sm"
                    >
                      Add new
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
              
                {loading ? (
                <p>Loading...</p>
                  ) : error ? (
                      <p>{error}</p>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td><UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            tag={Link}
                            to={"/admin/user/edit/" + user.id}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => {
                              e.preventDefault()
                              // deleteUser(user.id)
                              setUserId(user.id)
                                setOpen(true); // Open the modal
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown></td>
                      </tr>
                    ))
                )}
                </tbody>
              </Table>
              <CardFooter className="bg-transparent py-4">
                <nav aria-label="...">
                
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserIndex;
