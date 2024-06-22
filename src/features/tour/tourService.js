import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

const getTours = async () => {
  try {
    const response = await axios.get(`${base_url}tour/all-tour`);

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const createTour = async (tour) => {
  try {
    const response = await axios.post(`${base_url}tour/create-tour`, tour);

    if (response.status === 200) {
      toast.success("Tour Added Successfully ");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong !");
  }
};
const getSingleTour = async (id) => {
  try {
    const response = await axios.get(`${base_url}tour/single-tour/${id}`);

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const deleteTour = async (id) => {
  const response = await axios.delete(
    `${base_url}tour/delete-tour/${id}`,
    config
  );
  if (response.status === 200) {
    toast.success("Tour Delete Successfully ");
  } else {
    toast.error("Something Went Wrong");
  }
  return response.data;
};
const updateTour = async (tour) => {

  try{
    const response = await axios.patch(`${base_url}tour/update-tour/${tour.id}`, {
      title: tour.tourData.title,
      description: tour.tourData.description,
      price: tour.tourData.price,
      image: tour.tourData.image,
      date : tour.tourData.date,
      duration: tour.tourData.duration,
    });
    if(response.status === 200)
    {
      toast.success("Tour Data Updated")
    }
    return response.data

  }catch(error)
  {
    toast.error("Something Went Wrong !")
  }
 
};

const tourService = {
  getTours,
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
};

export default tourService;
