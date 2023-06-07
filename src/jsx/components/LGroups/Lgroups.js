import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";

const options = [
  { value: "mass", label: "Mass Action" },
  { value: "all", label: "Add a course to all groups" },
  { value: "removeall", label: "Remove a course from all groups" },
];

const Lgroups = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = () => {
     fetch('http://localhost:8000/groups')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setData(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  };

  useEffect( async () => {
    fetchData();
  }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("http://localhost:8000/groups/"+id,{
        method:'DELETE'
      });
      result=await result.json();
      console.warn(result)
      fetchData();
    }
  }
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
let history = useHistory();
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                Groups
              </Card.Title>
              <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="col-lg-5"
            >
            </Select>
            
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>DESCRIPTION</strong>
                    </th>
                    {/* <th>
                      <strong>OPTION</strong>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                {data?.map((item, index) => {
               return (
                  <tr key={index}>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>{item.groupname}</td>
                    <td>{item.groupdesc}</td>
                    <td>
                    {/* <div className="d-flex">
                        <Link
                          to="/edit-groups"
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
                      </div> */}
                    </td>
                  </tr>
               );
                })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
      <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default Lgroups;