import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { message } from "antd";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}contact/all-contact`);

  return response.data;
};

const getAEnquiry = async (id) =>{
  const response = await axios.get(`${base_url}contact/single-contact/${id}`)
  return response.data
}
const deleteEnquiry = async (id) =>{
  try{
    const response = await axios.delete(`${base_url}contact/delete-contact/${id}`)
    if(response.status === 200)
    {
      toast.success("Enquiry Delete Successfully")
    }
    return response.data
  }catch(error)
  {
    toast.error("Something Went Wrong") 
  }
 
}
const updateEnquiry = async (enquiry) =>{
  try{
    const response = await axios.put(`${base_url}contact/update-contact/${enquiry.id}`,{
      name : enquiry.enquiryData.name,
      email : enquiry.enquiryData.email,
      mobile : enquiry.enquiryData.mobile,
      message : enquiry.enquiryData.message,
      status : enquiry.enquiryData.status,
    })
   
    if(response.status === 200)
    {
      toast.success("Enquiry Update Successfully")
    }
    return response.data
  
  }catch(error)
  {
   toast.error("Something Went Wrong")
  }
}


const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getAEnquiry,
  updateEnquiry
};

export default enquiryService;