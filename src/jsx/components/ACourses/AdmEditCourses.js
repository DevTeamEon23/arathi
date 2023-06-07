import React,{useState} from 'react';
import Select from "react-select";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import DateRangePicker from "react-bootstrap-daterangepicker";

const options = [
    { value: "certificate_1", label: "Certificate 1" },
    { value: "certificate_2", label: "Certificate 2" },
    { value: "certificate_3", label: "Certificate 3" },
    { value: "certificate_4", label: "Certificate 4" },
  ];
  const options_1 = [
    { value: "level_1", label: "Level 1" },
    { value: "level_2", label: "Level 2" },
    { value: "level_3", label: "Level 3" },
    { value: "level_4", label: "Level 4" },
  ];
  const options_2 = [
    { value: "parent_category_1", label: "Parent Category 1" },
    { value: "parent_category_2", label: "Parent Category 2" },
    { value: "parent_category_3", label: "Parent Category 3" },
    { value: "parent_category_4", label: "Parent Category 4" },
  ];

const AdmEditCourses = ({editFormData, handleEditFormChange, handleCancelClick, handleChange}) =>{
    
  const [selectedOption, setSelectedOption] = useState(null);
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return(
        <>
            <>
				<td></td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a eid number ..." name="coursename" 
                        value={editFormData.eid}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="file" required = "required" placeholder = "Select Photo ..." name="addcoursephoto" 
                        value={editFormData.sid}
                        
                        onChange={handleChange}
                    /><img src={file} width="250" height="250"/>
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a user description ..." name="description" 
                        value={editFormData.user}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="checkbox" required = "required" placeholder = "Enter a active ..." name="active" 
                        value={editFormData.department}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="checkbox" required = "required" placeholder = "Enter a hidecourse" name="hidecourse"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a coursecode ..." name="coursecode" 
                        value={editFormData.usertype}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a price ..." name="price" 
                        value={editFormData.registration}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a coursevideolink ..." name="coursevideolink" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="file" required = "required" placeholder = "Select a Video file ..." name="coursevideofile" 
                        value={editFormData.lastlogin}
                        onChange={this.twoCalls}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a capacity ..." name="capacity" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td><DateRangePicker>
                    <input type="text" required = "required" placeholder = "Enter a coursedate ..." name="coursedate" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                    </DateRangePicker>
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a coursetime ..." name="coursetime" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                   
                </td>
                <td> 
                    <Select required = "required" placeholder = "Enter a certificate ..." name="certificate">
                        value={editFormData.lastlogin}
                        onChange={setSelectedOption}
                        options={options}
                    </Select>
                </td>
                <td>
                    <Select required = "required" placeholder = "Enter a level ..." name="level">
                        value={editFormData.lastlogin}
                        onChange={setSelectedOption}
                        options={options_1}
                    </Select>
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a instname ..." name="instname" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <Select required = "required" placeholder = "Enter a parentcategory ..." name="parentcategory">
                        value={editFormData.lastlogin}
                        onChange={setSelectedOption}
                        options={options_2}
                    </Select>
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a lastprice ..." name="lastprice" 
                        value={editFormData.lastlogin}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>	
					<div className="d-flex">
						<button className="btn btn-warning shadow btn-xs sharp me-1" type="submit"><i className="las la-check-circle scale5"></i></button>
						<button className="btn btn-danger shadow btn-xs sharp " type="button" onClick={handleCancelClick}>
							<i className="las la-times-circle scale5"></i>
						</button>
					</div>
                </td>
            </>
        </>
    )
}
export default AdmEditCourses;