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
import { formatDiagnosticsWithColorAndContext } from "typescript";
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from "react-router-dom";

  
  const ProductAdd = () => {
    const history = useHistory()
    // const { id } = useParams();
    const storedJwt = localStorage.getItem('token');
    const [jwt] = useState(storedJwt || null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsSelected] = useState(false);

    const [isOpen, setOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState();
    const [apiMessage, setApiMessage] = useState();

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const addProduct = async (product) => {

        if (!product) {
            return
          }

        const formData = new FormData();
        formData.append("title", product.title)
        formData.append("description", product.description)
        formData.append('file', selectedFile);

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`,
      {

        method: 'POST',
        headers: {
            'Authorization': jwt
        },
        body: formData
      })
  
      const data = await res.json()

      if (data.code === "200") {
        setTitle('')
        setDescription('')
        setIsSelected(false)

        setAlertStatus({"success": true})
        setApiMessage(data.message)
        setOpen(true)
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
                      <h3 className="mb-0">Add product</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault()
                          addProduct({title, description})
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
                      Product information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-title"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="lucky.jesse"
                              id="input-title"
                              placeholder="Title"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
                              Description
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Description"
                              id="input-description"
                              placeholder="Description"
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
                                Photo
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-file"
                              type="file"
                              onChange={changeHandler}
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
  
  export default ProductAdd;
  