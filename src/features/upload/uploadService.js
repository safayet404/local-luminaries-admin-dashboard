import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const uploadImg = async(data) =>{
    const response = await axios.post(`${base_url}image/`,data,config)
    console.log(response.data)
    
    return response.data
}

const deleteImg = async(id) =>{
    const response = await axios.delete(`${base_url}/delete-img/${id}`,config)
    return response
}

const uploadService = {
    uploadImg,
    deleteImg,
    
}

export default uploadService