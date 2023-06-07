import React,{ useState } from 'react'
import {
  Dropdown,
  Modal,
  Button,
  Table,
} from "react-bootstrap";

const MobileAppCompatibility = () => {  const [largeModal, setLargeModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
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
  return (
    <div><Dropdown.Item 
    variant="primary"
    className="mb-2 me-2"
    onClick={() => setLargeModal(true)}><i class="bi bi-tablet"> &nbsp;</i>
    Mobile App Compatibility
  </Dropdown.Item>
  <Modal
    className="fade bd-example-modal-lg"
    show={largeModal}
    size="lg"
  >
    <Modal.Header>
      <Modal.Title>Modal App Compatibility</Modal.Title>
      <Button
        variant=""
        className="btn-close"
        onClick={() => setLargeModal(false)}
      >
        
      </Button>
    </Modal.Header>
    <Modal.Body>
    <Table responsive>
  <thead>
    <tr>
      <th className="width80">
        Unit Name
      </th>
      <th>
        Mobile App Compatible
      </th>
      <th>
        Offline Compatible
      </th>
      <th>
        Render as web page
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
        How to create Instructor-led Training
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
      <td>
      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
      <div className="col-xl-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox2"
            required=""
            onClick={() => chackboxFun()}
          />
        </div>
        </div>
      </td>
      
    </tr>
  </tbody>
</Table>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger light"
        onClick={() => setLargeModal(false)}
      >
        Close
      </Button>
      <Button
        variant=""
        type="button"
        className="btn btn-primary"
      >
        Save changes
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default MobileAppCompatibility