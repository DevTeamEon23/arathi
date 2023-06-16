import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";

import Book from '@images/vector/Book_1.png';
import Check from '@images/vector/check.png';
import Bookmarks from '@images/vector/bookmarks.png';
import Bulb from '@images/vector/bulb.png';
import Progress from '@images/vector/Progress_1.png';


import { Link } from "react-router-dom";

function MyIcon(){
	return(
		<>
      <svg width="23" height="23" id="Isolation_Mode" data-name="Isolation Mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278.10 337.50">
        <path d="M1386.22 1289.84H1150.28c-.11-.51-.52-.57-1-.67-19.91-4.66-31.93-19.73-31.93-40.14q0-128 0-256a41.37 41.37 0 0 1 1.1-10.1c4.62-18.61 19.75-30.53 38.87-30.54 63.58 0 127.17.1 190.75-.13 7.83 0 14.93 5.16 14.61 14.66-.41 12.06 0 24.15-.17 36.23 0 2.71.8 3.32 3.32 3.2 4.38-.19 8.78-.09 13.17 0a33.13 33.13 0 0 1 7.2.43c5.93 1.41 9.17 6.49 9.17 13.82q0 126.67.1 253.36C1395.5 1281.43 1393.21 1286.81 1386.22 1289.84Zm-126.55-153.29c0-34.88 0-69 0-103.15 0-2.29-.76-2.62-2.77-2.61-22.06.06-44.13.09-66.19 0-2.53 0-3 .69-3 3.08.09 33.25.06 66.51.08 99.77 0 .79-.43 1.73.48 2.46q12.75-10.42 25.44-20.83c7.49-6.16 12.51-6.11 20.07.13C1242.26 1122.33 1250.73 1129.23 1259.67 1136.55Zm-13.51-130.23c29.64 0 59.27 0 88.91 0 2.43 0 3.15-.54 3.09-3-.18-7.57-.21-15.15 0-22.72.08-3-.67-3.77-3.72-3.76q-87.42.15-174.85.07c-.88 0-1.76 0-2.63 0-10.84.77-17.35 9.94-14 19.65 2.15 6.18 7.74 9.72 15.56 9.73Q1202.37 1006.34 1246.16 1006.32Z" fill="var(--primary)" transform="translate(-1117.37 -952.27)"/>
      </svg>
		</>
	)
}

function RightIcon(){
	return(
		<>
			<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19 0.25H4C3.00544 0.25 2.05161 0.645088 1.34835 1.34835C0.645088 2.05161 0.25 3.00544 0.25 4V19C0.25 19.9946 0.645088 20.9484 1.34835 21.6517C2.05161 22.3549 3.00544 22.75 4 22.75H19C19.9946 22.75 20.9484 22.3549 21.6517 21.6517C22.3549 20.9484 22.75 19.9946 22.75 19V4C22.75 3.00544 22.3549 2.05161 21.6517 1.34835C20.9484 0.645088 19.9946 0.25 19 0.25ZM16.875 8.5125L11.1625 16.0125C11.0461 16.1638 10.8965 16.2864 10.7253 16.3709C10.5542 16.4554 10.3659 16.4995 10.175 16.5C9.98513 16.501 9.79753 16.4588 9.62643 16.3765C9.45532 16.2942 9.30522 16.174 9.1875 16.025L6.1375 12.1375C6.03655 12.0078 5.96212 11.8595 5.91848 11.7011C5.87484 11.5426 5.86283 11.3772 5.88314 11.2141C5.90346 11.051 5.95569 10.8935 6.03687 10.7506C6.11804 10.6077 6.22657 10.4822 6.35625 10.3812C6.61815 10.1774 6.95032 10.0859 7.27968 10.1269C7.44276 10.1472 7.60025 10.1994 7.74314 10.2806C7.88604 10.3618 8.01155 10.4703 8.1125 10.6L10.15 13.2L14.875 6.95C14.9751 6.81868 15.1002 6.70836 15.2429 6.62536C15.3857 6.54235 15.5434 6.48828 15.7071 6.46622C15.8707 6.44417 16.0371 6.45457 16.1968 6.49682C16.3564 6.53908 16.5062 6.61237 16.6375 6.7125C16.7688 6.81263 16.8791 6.93765 16.9621 7.08042C17.0451 7.22318 17.0992 7.3809 17.1213 7.54456C17.1433 7.70823 17.1329 7.87463 17.0907 8.03427C17.0484 8.19392 16.9751 8.34368 16.875 8.475V8.5125Z" fill="var(--primary)"/>
			</svg>
		</>
	)
}

function BookIcon(){
	return(
		<>
			<svg width="23" height="23" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.3201 4.65852H2.86175C2.35544 4.6591 1.87003 4.8592 1.51201 5.21494C1.15399 5.57068 0.952605 6.053 0.952026 6.55609V24.5829C0.952032 24.7573 1.00037 24.9282 1.09175 25.077C1.18312 25.2259 1.31399 25.3468 1.47 25.4266C1.626 25.5063 1.80111 25.5418 1.97609 25.5292C2.15108 25.5166 2.31918 25.4563 2.46195 25.355L8.5901 21.005L14.72 25.355C14.8628 25.4563 15.0309 25.5166 15.2058 25.5292C15.3808 25.5418 15.5559 25.5063 15.7119 25.4265C15.8679 25.3468 15.9988 25.2258 16.0901 25.077C16.1815 24.9282 16.2298 24.7572 16.2298 24.5829V6.55609C16.2292 6.053 16.0278 5.57068 15.6698 5.21494C15.3118 4.8592 14.8264 4.6591 14.3201 4.65852V4.65852Z" fill="var(--primary)"/>
				<path d="M18.1395 0.863403H5.72635C5.4731 0.863403 5.23023 0.963364 5.05116 1.14129C4.87209 1.31923 4.77148 1.56055 4.77148 1.81218C4.77148 2.06382 4.87209 2.30514 5.05116 2.48307C5.23023 2.661 5.4731 2.76096 5.72635 2.76096H18.1395V20.7878C18.1395 21.0394 18.2401 21.2808 18.4192 21.4587C18.5983 21.6366 18.8412 21.7366 19.0944 21.7366C19.3476 21.7366 19.5905 21.6366 19.7696 21.4587C19.9487 21.2808 20.0493 21.0394 20.0493 20.7878V2.76096C20.0487 2.25788 19.8473 1.77556 19.4893 1.41982C19.1313 1.06408 18.6459 0.863979 18.1395 0.863403V0.863403Z" fill="var(--primary)"/>
			</svg>
		</>
	)
}

function BulbIcon(){
	return(
		<>
			<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.4999 7.13426C12.1639 7.13426 10.8617 7.55464 9.7778 8.33585C8.69393 9.11705 7.88334 10.2195 7.46084 11.487C7.03834 12.7545 7.02536 14.1228 7.42373 15.3981C7.82209 16.6733 8.61162 17.791 9.68047 18.5926V23.6852C9.68047 24.3605 9.94874 25.0082 10.4263 25.4857C10.9038 25.9632 11.5514 26.2315 12.2268 26.2315H14.7731C15.4484 26.2315 16.096 25.9632 16.5736 25.4857C17.0511 25.0082 17.3194 24.3605 17.3194 23.6852V18.5926C18.3882 17.791 19.1777 16.6733 19.5761 15.3981C19.9745 14.1228 19.9615 12.7545 19.539 11.487C19.1165 10.2195 18.3059 9.11705 17.222 8.33585C16.1382 7.55464 14.836 7.13426 13.4999 7.13426ZM13.4999 5.86111C13.8376 5.86111 14.1614 5.72698 14.4002 5.48822C14.6389 5.24946 14.7731 4.92563 14.7731 4.58797V2.04167C14.7731 1.70401 14.6389 1.38018 14.4002 1.14142C14.1614 0.902659 13.8376 0.768524 13.4999 0.768524C13.1622 0.768524 12.8384 0.902659 12.5997 1.14142C12.3609 1.38018 12.2268 1.70401 12.2268 2.04167V4.58797C12.2268 4.92563 12.3609 5.24946 12.5997 5.48822C12.8384 5.72698 13.1622 5.86111 13.4999 5.86111ZM24.9582 12.2269H22.4119C22.0743 12.2269 21.7505 12.361 21.5117 12.5998C21.2729 12.8385 21.1388 13.1623 21.1388 13.5C21.1388 13.8377 21.2729 14.1615 21.5117 14.4003C21.7505 14.639 22.0743 14.7731 22.4119 14.7731H24.9582C25.2959 14.7731 25.6197 14.639 25.8585 14.4003C26.0973 14.1615 26.2314 13.8377 26.2314 13.5C26.2314 13.1623 26.0973 12.8385 25.8585 12.5998C25.6197 12.361 25.2959 12.2269 24.9582 12.2269ZM4.58788 12.2269H2.04158C1.70392 12.2269 1.38009 12.361 1.14133 12.5998C0.902567 12.8385 0.768433 13.1623 0.768433 13.5C0.768433 13.8377 0.902567 14.1615 1.14133 14.4003C1.38009 14.639 1.70392 14.7731 2.04158 14.7731H4.58788C4.92554 14.7731 5.24937 14.639 5.48813 14.4003C5.72689 14.1615 5.86102 13.8377 5.86102 13.5C5.86102 13.1623 5.72689 12.8385 5.48813 12.5998C5.24937 12.361 4.92554 12.2269 4.58788 12.2269ZM7.97445 6.39584L6.14112 4.58797C5.89294 4.35329 5.5617 4.22682 5.22027 4.23637C4.87884 4.24592 4.55519 4.39071 4.32051 4.63889C4.08584 4.88707 3.95937 5.21831 3.96892 5.55974C3.97847 5.90117 4.12326 6.22482 4.37144 6.45949L6.20477 8.22917C6.3278 8.34797 6.47351 8.44076 6.63319 8.50201C6.79287 8.56325 6.96325 8.5917 7.13417 8.58565C7.30567 8.585 7.47527 8.5497 7.63279 8.48188C7.79031 8.41406 7.9325 8.31511 8.05084 8.19098C8.2781 7.94248 8.39765 7.61407 8.38334 7.27763C8.36902 6.94119 8.222 6.62413 7.97445 6.39584ZM22.6538 4.65162C22.4153 4.4145 22.0926 4.2814 21.7563 4.2814C21.4199 4.2814 21.0972 4.4145 20.8587 4.65162L19.0254 6.39584C18.7882 6.63438 18.6551 6.95706 18.6551 7.29341C18.6551 7.62975 18.7882 7.95244 19.0254 8.19098C19.1437 8.31511 19.2859 8.41406 19.4434 8.48188C19.6009 8.5497 19.7705 8.585 19.942 8.58565C20.2698 8.58435 20.5845 8.45666 20.8205 8.22917L22.6538 6.45949C22.7732 6.34114 22.8679 6.20033 22.9325 6.04518C22.9972 5.89004 23.0304 5.72363 23.0304 5.55556C23.0304 5.38749 22.9972 5.22108 22.9325 5.06594C22.8679 4.91079 22.7732 4.76998 22.6538 4.65162Z" fill="var(--primary)"/>
			</svg>
		</>
	)
}
function ProgressIcon(){
	return(
		<>
    <svg width="23" height="23" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.54 463.16">
      <path d="M3185 82.44c-51.38 0-102.76-.08-154.14.12-4.74 0-5.76-1.41-5.48-5.73.37-5.46.07-11 .09-16.45 0-9 4.55-15.09 13.21-17.53 1.77-.5 2.76-.66 2.82-2.94 1.63-59.54 29.85-105 75.11-141.35 5.69-4.56 11.78-8.63 17.84-12.71 26.21-17.66 26.31-52.36-.11-69.72-31.53-20.74-57.34-46.72-74.58-80.58-11.58-22.76-18-46.94-18.24-72.59 0-2.71-1-3.4-3.37-4.09-8.13-2.31-12.63-8.51-12.67-16.89 0-6.49.09-13-.06-19.46-.06-2.38.62-3.38 3-3a17.24 17.24 0 0 0 2.49 0q154.14 0 308.28-.11c4.5 0 5.94 1 5.61 5.61-.43 5.95-.08 12-.12 17.95-.05 8.41-5 14.63-13.15 16.28-1.85.37-2.8.48-2.87 2.79-1.59 58.94-29.38 104.16-73.94 140.46-6.16 5-12.81 9.47-19.43 13.88-25.61 17.09-25.67 52.33.12 69.19 32.18 21 58.35 47.52 75.62 82.2A163.65 163.65 0 0 1 3328.78 39c0 2.12 0 3.29 2.92 3.77 7.93 1.32 13 7.81 13.06 15.8.06 6.65-.28 13.32.12 20 .25 4.12-1.78 4-4.7 4q-60.61-.09-121.22 0Zm.39-423q-61.84 0-123.69-.08c-3.43 0-4.76.67-4.3 4.29.61 4.77.59 9.63 1.24 14.39 4.9 36.28 21.15 67 46.27 93.22 11.66 12.18 24.87 22.45 38.9 31.76 16.8 11.15 25.92 26.88 26.21 47.08.3 21-8.92 37.41-26.39 49-14.18 9.4-27.51 19.78-39.22 32.14-28.29 29.86-44.93 64.87-46.94 106.33-.13 2.82-.72 5.12 3.94 5.11q123.69-.26 247.38 0c3.92 0 4.15-1.48 4-4.59-1-18.18-4.42-35.82-11.42-52.68-15-36-40.17-63.28-72.32-84.58-6.41-4.24-12.43-8.86-17.15-15a56.67 56.67 0 0 1 12.81-81.61c10.27-7.07 20.53-14.1 29.78-22.49 34-30.9 55.09-68.38 58.11-115 .47-7.27.55-7.26-6.5-7.26Zm-95.44 64c.11 2.08 1.36 3.48 2.24 5 14.5 25.11 34.68 44.74 58.85 60.38 17.69 11.44 29 27.18 33.47 47.78a2.46 2.46 0 0 0 1.58-1.8c5.07-21.62 18.4-36.67 36.74-48.57a169.48 169.48 0 0 0 58-62.79Zm205.9 303c-3-11.31-10.1-19.46-18.68-26.44-16.72-13.58-36.29-21.58-56.49-28.25-14.09-4.65-27.89-9.72-35.66-24.48C3180.64-43.3 3173-38 3164.4-33.83c-5.66 2.79-11.71 4.53-17.66 6.55-19.84 6.76-39 14.87-55.21 28.62-7.82 6.63-14.16 14.36-17.21 25.1ZM3192.81-128.91a33.31 33.31 0 0 0 0-4.47c-.6-4.3-3.11-6.94-7.47-7.3-3.9-.33-7.35 3-7.82 7.45a47.4 47.4 0 0 0-.08 6.95c.21 5.22 3.24 8.72 7.55 8.84 4.46.13 7.68-3.52 7.93-9 0-.83 0-1.66 0-2.49Zm-15.32 39.29a32.82 32.82 0 0 0 0 5c.67 4.31 3.31 7.06 7.66 7s7.08-2.81 7.53-7.14a38.48 38.48 0 0 0-.12-9.41 7.11 7.11 0 0 0-7.52-6.54c-4.1 0-6.7 2.56-7.48 6.64a32.92 32.92 0 0 0-.27 4.45Z" fill="var(--primary)" transform="translate(-3025.38 380.6)"/>
    </svg>
		</>
	)
}

const CourseBlogData = [
	{ coloumClass:'col-sm-6',classChange:'bg-info', image: Book, imgClass:'',	title: 'Courses', number:'2', svgicon: <MyIcon />, },
	{ coloumClass:'col-sm-6',classChange:'bg-info', image: Bookmarks,	imgClass:'bookmarks', title: 'Assigned learner', number:'0', svgicon: <BookIcon /> },
	{ coloumClass:'col-sm-6',classChange:'bg-info', image: Check, imgClass:'',	title: 'Completed learner', number:'0', svgicon: <RightIcon /> },
	{ coloumClass:'col-sm-6',classChange:'bg-info', image: Progress,	imgClass:'', title: 'Course in progress', number:'0', svgicon: <ProgressIcon /> },
	{ coloumClass:'col-sm-6',classChange:'bg-info', image: Bulb, imgClass:'bulb',	title: 'Training time', number:'0h0m', svgicon: <BulbIcon /> }
];

const CourseReports = () => {
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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Course Reports</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="row">
              <div className="col-lg-1">
            </div>
    {CourseBlogData.map((item, ind)=>(
      <div className={`col-xl-2 ${item.coloumClass}`} key={ind} >
        <div className={`dlab-cource ${item.classChange}`}>
          <div className="d-flex align-items-center">
            <span className="course-icon">
              {item.svgicon}
            </span>	
            <div className="ms-2">
              <h4 className="mb-0">{item.number}</h4>
              <span>{item.title}</span>
            </div>
          </div>
          <img src={item.image} alt="" className={item.imgClass} />
        </div>
      </div>
    ))}
    </div>
                <Card.Header>
                  </Card.Header>
              <Table responsive striped bordered className="verticle-middle">
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>COURSE</strong>
                    </th>
                    <th>
                      <strong>ENROLLED</strong>
                    </th>
                    <th>
                      <strong>COMPLETED</strong>
                    </th>
                    <th>
                      <strong>IN PROGRESS</strong>
                    </th>
                    <th>
                      <strong>NOT STARTED</strong>
                    </th>
                    <th>
                      <strong>ENROLLED DATE</strong>
                    </th>
                    <th>
                      <strong>DUE DATE</strong>
                    </th>
                    <th>
                      <strong>COMPLETED ON TIME</strong>
                    </th>
                    <th>
                      <strong>DELAYED COURSES</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <Link to="/course_overview"><strong>Advanced Features of LMS</strong></Link>
                    </td>
                    <td><center>100</center></td>
                    <td><center>50</center></td>
                    <td><center>25</center></td>
                    <td><center>25</center></td>
                    <td><center>01-Dec-2022</center></td>
                    <td><center>25-Dec-2022</center></td>
                    <td><center>40</center></td>
                    <td><center>10</center></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CourseReports;