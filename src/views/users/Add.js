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
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useParams, useState } from 'react'
import { useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
  
  const UserAdd = () => {
    const history = useHistory()
    // const { id } = useParams();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState();
    const [apiMessage, setApiMessage] = useState();

    const addUser = async (user) => {

      if (!user) {
        return
      }

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
  
      const data = await res.json()

      if (data.code === "200") {
        setUsername('')
        setPassword('')
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

      console.log(data)
    }
  
    return (
      <>
      <SweetAlert      
            {...alertStatus}
            show={isOpen} //Notice how we bind the show property to our component state
            title="Info"
            onConfirm={() => setOpen(false)}
            timeout={2000}
            showConfirmButton={false}
        >
            {apiMessage}
        </SweetAlert>
      <div className="header bg-gradient-info pb-6 pt-5 pt-md-8">
      </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add user</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault()
                          addUser({username, password})
                        }}
                        size="md"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="lucky.jesse"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Lucky"
                              id="input-first-name"
                              placeholder="Password"
                              type="text"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default UserAdd;
  