import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";

import { AiFillDelete,AiOutlineEye  } from "react-icons/ai";
import { Link } from "react-router-dom";

const Enquiries = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      
    },
    {
      title: "Name",
      dataIndex: "name",
    
    },
    {
      title: "Email",
      dataIndex: "email",
  
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
     
    },
    {
      title: "Comment",
      dataIndex: "comment",
     
    },
    {
      title: "Status",
      dataIndex: "status",
     
    },
    {
      title: "Date",
      dataIndex: "date",
     
    },
    {
      title: "Action",
      dataIndex: "action",
     
    },
  ];

  const data2 = [];

  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(getEnquiries())
  },[])
  const enquiry_state = useSelector((state)=> state.enquiry.enquiries)

 
  for (let i = 0; i < enquiry_state.length; i++) {
    data2.push({
      key: i+1,
      name: enquiry_state[i].name.substring(0,10),
      email: enquiry_state[i].email,
      mobile: enquiry_state[i].mobile,
      comment: enquiry_state[i].message.substring(0,10),
      date : new Date(enquiry_state[i].createdAt).toLocaleString(),
      status: (
        <>
          <select
            name=""
            defaultValue={enquiry_state[i].status ? enquiry_state[i].status : "Submitted"}
            className="form-control form-select"
            id=""
           
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action :  (
        <>
          <Link to={`/admin/view-enquiry/${enquiry_state[i]._id}`} className=" fs-3 text-danger">
            <AiOutlineEye />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
     
    });
  }
  return (
    <div>
      <h3 className="mb-4">Enquires</h3>
      <Table columns={columns} dataSource={data2}></Table>
    </div>
  );
};

export default Enquiries;
