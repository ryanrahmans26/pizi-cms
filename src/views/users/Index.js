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

const UserIndex = () => {
  const storedJwt = localStorage.getItem('token');
  const [jwt] = useState(storedJwt || null);

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getUsers = async (token) => {
    const res = await fetch('http://localhost:8080/user',
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
    }

    setError(data.error)
  }

  useEffect(() => {
      setLoading(true)
      getUsers(jwt)
      setLoading(false)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:8080/user/${id}`,
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
    }

    setError(data.error)
  }

  return (
    <>
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
                    <h3 className="text-white mb-0">Users</h3>
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
                    <th scope="col" />
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
                        <UncontrolledDropdown>
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
                              deleteUser(user.id)
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
