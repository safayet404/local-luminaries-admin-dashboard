import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getTeam = async () => {
  const response = await axios.get(`${base_url}team/all-team`);

  return response.data;
};
const createTeam = async (team) => {
  try {
    const response = await axios.post(`${base_url}team/create-team`, team);

    if (response.status === 200) {
      toast.success("Team is Created");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`${base_url}team/delete-team/${id}`);
    if (response.status === 200) {
      toast.success("Team Data Deleted Successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const updateTeam = async (team) => {
  try {
    const response = await axios.put(`${base_url}team/update-team/${team.id}`, {
      name: team.teamData.name,
      designation: team.teamData.designation,
      image: team.teamData.image,
      socialMediaLink: {
        facebookLink: team.teamData.socialMediaLink.facebookLink,
        linkedinLink: team.teamData.socialMediaLink.linkedinLink,
        instagramLink: team.teamData.socialMediaLink.instagramLink,
      },
    });

    if (response.status === 200) {
      toast.success("Team Data Updated Successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const getSingleTeam = async (id) => {
  const response = await axios.get(`${base_url}team/single-team/${id}`);
  return response.data;
};
const teamService = {
  getTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
  createTeam,
};

export default teamService;
