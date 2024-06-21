import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAEnquiry, updateEnquiry } from "../features/enquiry/enquirySlice";
const ViewEnquiries = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getEnqId = location.pathname.split("/")[3]
    const enqState = useSelector((state)=> state.enquiry)
    const {enqName,enqDate,enqMobile,enqEmail,enqStatus,enqComment} = enqState

    const [enq,setEnq] = useState("")
    console.log(enq)
    useEffect(()=>{
        dispatch(getAEnquiry(getEnqId))
    },[enqName])
    const goBack = () =>{
        navigate("/admin/enquiries")
        window.location.reload(true);
      
    }
    const setEnquiryStatus = (e,i)=>{
        console.log(e,i);
        const data = {id : i, enquiryData : e}
        dispatch(updateEnquiry(data))
       
        setTimeout(()=>{
            dispatch(getAEnquiry(getEnqId))
        },100)
    }




  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>View Enquiry</h3>
        <button className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1" onClick={goBack}>
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-33 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name : </h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile : </h6>
          <p className="mb-0">{enqMobile}</p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email : </h6>
          <p className="mb-0">{enqEmail} </p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment : </h6>
          <p className="mb-0">{enqComment} </p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Date : </h6>
          <p className="mb-0">{enqDate} </p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status : </h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status : </h6>
          <div>
            <select className="form-control form-select" name="" defaultValue={enqStatus ? enqStatus : "Submitted"} id="" onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}>
               
                <option value="Submitted">Submitted</option>
              
                <option value="Contacted">Contacted</option>
                <option value="Resolved">Resolved</option>
                <option value="In Progress">In Progress</option>
            </select>
          </div>

        
        
        </div>
      
      </div>
    </div>
  );
};

export default ViewEnquiries;
