import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
} from "react-bootstrap";




const CoursesScorm = () => {
  // const myIframe =document.getElementById("myIframe");
var filename = "1681447333/story.html";
  // function changestuff () {
  //   const iframeWindow = myIframe.contentWindow;
  //   const iframeDocument = myIframe.contentDocument;
  //   const iframeHeading = iframeDocument.querySelector("iframe");

  //   iframeDocument.body
  // }
  // const [upload, setUpload] = useState([]);

  // const getUsers = async () => {
  //   const requestOptions = {
  //     method:"GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch("/api", requestOptions);
  //   const data = await response.json();

  //   console.log(data);
  // // };
  const [data, setData] = useState([]);
  // const [uname, setUname] = useState('');
  // const [file, setFile] = useState([]);

  const fetchData = () => {
    fetch(`https://localhost:8000/scorm/story.html`)
    .then((res) => res.json())
    .then((data) => {
       console.log(data);
       setData(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// const handleSubmit = (e) => {
//   e.preventDefault();
  
//   const data = {uname, file};

//   fetch('http://localhost:8000/upload', {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {'Content-Type': 'application/json; charset=UTF-8'},
//     redirect: 'follow',

//     body: JSON.stringify(data)
//   }).then((res) => res.json(data))
//   .then((data) => {
//   console.log('new user added')
//   alert("✔️ User Added Successfully");
//   setUpload(data);
// })
// };
// useEffect( async () => {
//   fetchData();
// }, []);
    return (
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Course Intro Video</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="row">
              <div className="col-lg-12">
              <form action="https://localhost:8000/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" />
                <input type="text" id="uname" name="uname"/>
                <input type="submit"/>
              </form>
                </div>
              </div>
              <br/>
              <br/>
            <div className="row">
              <div className="col-lg-1">
            </div>
                <div className="col-lg-12">
            </div>
            {/* <form > */}
            {/* <iframe src="https://drive.google.com/file/d/1sbNypqGVZSVNxxdbmAWjRx2119O3hfFk/preview" width="640" height="480" allow="autoplay"></iframe> */}
              {/* /// Uncomment this below line
            // src="https://drive.google.com/file/d/1sbNypqGVZSVNxxdbmAWjRx2119O3hfFk/preview" */}

            {/* </form>  */}
            <form action="https://127.0.0.1:8000/scorm" method="GET" enctype="application/x-www-form-urlencoded">
            <video width="960" height="500" controls muted="muted">
                {/* <source src={`http://localhost:8000/scorm`} width="640" height="480" type="video/mp4" allow="autoplay" />
                <iframe src={`http://127.0.0.1:8000/scorm`} width="640" height="480" type="video/mp4" allow="autoplay"></iframe> */}
                   <source src="https://127.0.0.1:8000/scorm/story.html" width="640" height="480" allow="autoplay"/>
                   </video>
                  {/* /// Uncomment this below line
                  src="https://drive.google.com/file/d/1sbNypqGVZSVNxxdbmAWjRx2119O3hfFk/preview" */}

                  </form>                  
                  <br/>
                  <br/>
                  <br/>
              </div>
              {/* to play video in hardcode */}

            </Card.Body>
          </Card>
        </Col>
      </Row>

    );
  }

export default CoursesScorm;
