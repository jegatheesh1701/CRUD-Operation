import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {confirm} from "react-confirm-box";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import "./BasicTable.css";

function ReactTable(){
  const [UserDetails, setUserDetails]= useState([]);
  const [id, setId] = useState("");
  const [fName, setfName] = useState("");
  const [Email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [Show, setShow] = useState(false)

  //add user
  const [addId, setAddId] = useState("");
  const [addfName, setAddfName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addAge, setAddAge] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addShow, setAddShow] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const data = JSON.parse(sessionStorage.getItem("UserDetails")) || [];
    setUserDetails(data);
  },[]);
  

  const handleEdit = (value)=>{
    setId(value.id);
    setfName(value.fName);
    setEmail(value.Email);
    setAge(value.age);
    setPhone(value.phone);
    setShow(true);
  }
const handleDel = async (value)=>{
  const result= await confirm("Are You Sure To Delete?");
  if(result){
    const updatedDetails = UserDetails.filter((user)=>user.id !== value.id );
    const reindexedDetails = updatedDetails.map((user, index) => ({
      ...user,
      id: index + 1, 
    }));

    setUserDetails(reindexedDetails);
    sessionStorage.setItem("UserDetails", JSON.stringify(reindexedDetails));
    
  }
};
const handleUpdate= ()=>{
  const updatedDetails= UserDetails.map((user)=>
  user.id === id ? {...user, fName, Email, age, phone} : user
  );
  setUserDetails(updatedDetails);
  sessionStorage.setItem("UserDetails", JSON.stringify(updatedDetails));
  setShow(false);
};

const handleAdding = ()=>{
  setAddShow(true);
};

const handleAddingDetail = ()=>{
  const addId= UserDetails.length+1;
  const add={
    id: addId,
    fName: addfName,
    Email: addEmail,
    age: addAge,
    phone : addPhone,
  };
const updatedDetails=[...UserDetails, add];
setUserDetails(updatedDetails);
sessionStorage.setItem("UserDetails", JSON.stringify(updatedDetails));
setAddShow(false);
setAddId("");
setAddfName("");
setAddEmail("");
setAddAge("");
setAddPhone("");
};



const Table = {
  columns:[
    {label:"S.No", field:"id"},
    {label:"Name", field:"name"},
    {label:"Email", field:"email"},
    {label:"Age", field:"age"},
    {label:"Phone", field:"phone"},
    {label:"Action", field:"action"}
  ],
  rows: UserDetails.map((value)=>({
    id: value.id,
    name: value.fName,
    email: value.Email,
    age: value.age,
    phone:value.phone,
    action:(
<div className="flex justify-around" key={value.id}>
  <FaEdit onClick={()=>handleEdit(value)}/>
  <FaTrash onClick={()=>handleDel(value)}/>
</div>
    )
  }))
};

//navigate('view')
return (
<div>
  <div>
  <div className="add"><button className="add text-green-950 text-2xl" onClick={handleAdding}>Add Users</button></div>
  <div className="view"><button className="view" onClick={()=> navigate('/view')} >View Page</button></div>
  </div>
  <MDBDataTable striped bordered data={Table} className="BasicTable"  />  

{/* Edit Modal */}
<Modal show={Show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            
            <label>Name</label>
            <input
              type="text"
              value={fName}
              onChange={(e) => setfName(e.target.value)}
              className="form-control"
            />
            <label>Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={addShow} onHide={() => setAddShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div>
            <label>S.No</label>
            <input
              type="text"
              value={addId}
              onChange={(e) => setAddId(e.target.value)}
              className="form-control"
            /> 
            <label>Name</label>
            <input   
              type="text"
              value={addfName}
              onChange={(e) => setAddfName(e.target.value)}
              className="form-control"
            />
            <label>Email</label>
            <input
              type="email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              className="form-control"
            />
            <label>Age</label>
            <input
              type="number"
              value={addAge}
              onChange={(e) => setAddAge(e.target.value)}
              className="form-control"
            />
            <label>Phone</label>
            <input
              type="text"
              value={addPhone}
              onChange={(e) => setAddPhone(e.target.value)}
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddingDetail}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
  
</div>
)
}
export default ReactTable;