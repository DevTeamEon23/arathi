import React from 'react';

const Editable = ({editFormData, handleEditFormChange, handleCancelClick}) =>{
    return(
        <>
            <>
				<td></td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a eid number ..." name="eid" 
                        value={editFormData.eid}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="text" required = "required" placeholder = "Enter a sid number ..." name="sid" 
                        value={editFormData.sid}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a user name ..." name="user" 
                        value={editFormData.user}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a department ..." name="department" 
                        value={editFormData.department}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Enter a email" name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a usertype ..." name="usertype" 
                        value={editFormData.usertype}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a registration ..." name="registration" 
                        value={editFormData.registration}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a lastlogin ..." name="lastlogin" 
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
export default Editable;