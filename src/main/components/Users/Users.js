import { useState, useEffect } from 'react';
import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Nav,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const Users = () => {
  const [id, setId] = useState('');
  const [eid, setEid] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [adhr, setAdhr] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const [file, setFile] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUser] = useState([]);
  const [userId, setUserId] = useState([]);

  const getUsers = async () => {
    const requestOptions = {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    console.log(data);
  };
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://localhost:8000/users`)
    //This function is used while fetching data from FASTAPI (HTTP/HTTPS) 3.110.124.80
      // .then((response) => response.json())
      // .then((actualData) => {
      //   console.log(actualData);
      //   setUsers(actualData.data);
      //   console.log(data);

      // This is used for fetching data from json-server port 4000 fastAPI 8000
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
         setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // function selectUser(userId)
  // {
  //   let item=users[id-1];
  //   setEid(item.eid);
  //   setFirstname(item.firstname);
  //   setLastname(item.lastname);
  //   setEmail(item.email);
  //   setDept(item.dept);
  //   setAdhr(item.adhr);
  //   setBio(item.bio);
  //   setUsername(item.username);
  //   setPassword(item.password);
  //   setFile(item.file);
  //   setIsActive(item.isActive);
  //   setUserId(item.id)
  // }
  // function updateUser()
  // {
  //   let item={eid,firstname,lastname,email,dept,adhr,bio,username, password,file,isActive,userId}
  //   console.warn("data",data)
  //   fetch(`http://localhost:8000/users/${userId}`, {
  //     method: 'PUT',
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }
  // useEffect( async () => {
  //   fetchData();
  // }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("http://localhost:8000/users/"+id,{
        method:'DELETE'
      });
      result=await result.json();
      console.warn(result)
      fetchData();
    }
  }

  return (
    <>
    <Fragment>
      <Nav >
		<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/dashboard">Dashboard</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/add-user">Add Users</Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Users List</Card.Title>
              <div>
                <Link to="/add-user">
                  <Button variant="primary">Add Users</Button>
                </Link>&nbsp;&nbsp;
                <Link to="/import-user">
                  <Button variant="primary">Import Users</Button>
                </Link>&nbsp;&nbsp;
                <Link to="/export-user">
                  <Button variant="primary">Export Users</Button>
                </Link>
              </div>
            </Card.Header>
              <Table responsive striped bordered className="verticle-middle">
                <thead>
                  <tr>
                    <th>
                      <strong><center>EID</center></strong>
                    </th>
                    <th>
                      <strong><center>SID</center></strong>
                    </th>
                    <th>
                      <strong><center>USER</center></strong>
                    </th>
                    <th>
                      <strong><center>DEPARTMENT</center></strong>
                    </th>
                    <th>
                      <strong><center>EMAIL</center></strong>
                    </th>
                    <th>
                      <strong><center>USER TYPE</center></strong>
                    </th>
                    <th>
                      <strong><center>REGISTRATION</center></strong>
                    </th>
                    <th>
                      <strong><center>LAST LOGIN</center></strong>
                    </th>
                    <th>
                      <strong><center>OPTIONS</center></strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data?.map((item, index) => {
               return (
                <tr key={index}>
                <td><center>{item.id}</center></td>
                <td><center>{item.eid}</center></td>
                <td><center>{item.firstname}  {item.lastname}</center></td>
                <td><center>{item.dept}</center></td>
                <td><center>{item.email}</center></td>
                <td><center>{item.categorytype}</center></td>
                <td><center>2/2/2022</center></td>
                <td><center>3 hrs Ago</center></td>
                {/* {users.map((data) => {
               return (
                <tr key={data.id}>
                <td><center>{data.eid}</center></td>
                <td><center>{data.eid}</center></td>
                <td><center>{data.firstname}  {data.lastname}</center></td>
                <td><center>{data.dept}</center></td>
                <td><center>{data.email}</center></td>
                <td><center>{data.categorytype}</center></td>
                <td><center>2/2/2022</center></td>
                <td><center>3 hrs Ago</center></td> */}
                <td>
                        <center>
                        {/* <Button onClick={(e)=>selectUser(item.id)}>Select</Button> */}
                        <Link
                          to="/edit-user"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                          onClick={()=>deleteOperation(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                        </center>
                    </td>
                  </tr>
               );
                })}
                </tbody>
              </Table>
              {/* <div>
                <form action="http://localhost:8000/users/${userId}" method='PUT' encType="multipart/form-data">
                <input type="text" id="eid" name="eid" value={eid} onChange={(e) => setEid(e.target.value)} />
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} />
                <input type="text" value={adhr} onChange={(e) => setAdhr(e.target.value)} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
                <input type="text" value={isActive} onChange={(e) => setIsActive(e.target.value)} />
                <button onClick={updateUser} >Update</button>
                </form>
              </div> */}
          </Card>
        </Col>
      </Row>
    </Fragment>
    </>
  );
}
export default Users;
