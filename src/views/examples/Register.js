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
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert";

const Register = () => {
  const history = useHistory();

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

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
      history.push("/admin/index")
    } else {
      setAlertStatus({"warning": true})
      setApiMessage(data.message)
      setOpen(true)
    }

    console.log(data)
  }

  const onSubmit = e => {
    e.preventDefault();

    addUser({username, password})
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
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <form onSubmit={onSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Username" type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register