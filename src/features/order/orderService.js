import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

const createOrder = async (order) => {
  try {
    const response = await axios.post(`${base_url}order/create-order`, order);
    if (response.status === 200) {
      toast.success("Order added successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};

const getAllOrder = async () => {
  try {
    const response = await axios.get(`${base_url}order/all-order`);

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};

const getSingleOrder = async (id) =>{
  try{ 
    const response = await axios.get(`${base_url}order/single-order/${id}`)
    return response.data
  }catch(error)
  {
    toast.error("Something Went Wrong")
  }
}

const updateOrder = async (order) =>{
  try{
    const response = await axios.put(`${base_url}order/update-order/${order.id}`,
      {
        firstName : order.orderData.firstName,
        lastName : order.orderData.lastName,
        email : order.orderData.email,
        mobile : order.orderData.mobile,
        address : {
          house : order.orderData.address.house,
          road : order.orderData.address.road,
          city : order.orderData.address.city,
          postCode : order.orderData.address.postCode,
         
        },
        person : order.orderData.person,
        price : order.orderData.price,
        paidAmount : order.orderData.paidAmount,
        
      }
    )

    if(response.status === 200)
      {
        toast.success("Order Data Updated Successfully")
      }
    return response.data
  }catch(error)
  {
    toast.error("Something Went Wrong")
  }
}

const deleteOrder = async(id)=>{
  try{
    const response = await axios.delete(`${base_url}order/delete-order/${id}`)
    if(response.status === 200)
      {
        toast.success("Order Data Deleted Successfully")
      }
  }catch(error)
  {
    toast.error("Something Went Wrong")
  }
}
export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder
};
