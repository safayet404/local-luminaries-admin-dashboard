import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getDestination = async () =>{
    try{
        const response = await axios.get(`${base_url}destination/all-destination`);
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const createDestination = async (destination) =>{
    try{
        const response = await axios.post(`${base_url}destination/create-destination`,destination)
        if(response.status === 200)
        {
            toast.success("Destination Added Successfully")
        }

        return response.data

    }catch(error)
    {
        throw new Error(error)
    }
}

const getSingleDestination = async(id) =>{
    try{
        const response = await axios.get(`${base_url}destination/single-destination/${id}`)
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong")
    }
}

const deleteDestination = async(id) =>{
    try{
        const response = await axios.delete(`${base_url}destination/delete-destination/${id}`)

        if(response.status === 200)
        {
            toast.success("Delete Destination")
        }
        return response.data

    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const updateDestination = async(destination) =>{
    try{
        const response = await axios.put(`${base_url}destination/update-destination/${destination.id}`,{
            name : destination.destinationData.name,
            image : destination.destinationData.image
        })

        if(response.status === 200)
        {
            toast.success("Destination Data Updated")
        }
        return response.data

    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const destinationService = {
    getDestination,
    createDestination,
    getSingleDestination,
    updateDestination,
    deleteDestination
}

export default destinationService