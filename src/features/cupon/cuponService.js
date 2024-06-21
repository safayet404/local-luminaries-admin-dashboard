import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getCupons = async () => {
  const response = await axios.get(`${base_url}cupon/all-cupon`);

  return response.data;
};
const createCupons = async (cupon) => {
  try {
    const response = await axios.post(`${base_url}cupon/`, cupon, config);

    if (response.status === 200) {
     
    }
    return response.data;
  } catch (error) {
   
  }
};
const getACupon = async (id) => {
  const response = await axios.get(
    `${base_url}cupon/get-single/${id}`,
    config
  );
  return response;
};
const updateCupon = async (cupon) => {
  try {
    const response = await axios.put(
      `${base_url}cupon/update-cupon/${cupon.id}`,
      { name: cupon.cuponData.name,
        expiry : cupon.cuponData.expiry,
        discount : cupon.cuponData.discount
       },
      config
    );

    if (response.status === 200) {
     
    }
    return response.data;
  } catch (error) {
    
  }
};
const deleteCupon = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}cupon/delete-cupon/${id}`,
      config
    );

    if (response.status === 200) {
      
    }
    return response.data;
  } catch (error) {
   
  }
};

const cuponService = {
  getCupons,
  createCupons,
  getACupon,
  updateCupon,
  deleteCupon,
};

export default cuponService;
