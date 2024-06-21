import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getActivities = async () => {
  const response = await axios.get(`${base_url}activity/all-activity`);
  return response.data;
};
const getSingleActivity = async (id) => {
  const response = await axios.get(`${base_url}activity/single-activity/${id}`);
  return response.data;
};
const updateActivity = async (activity) => {
  try {
    const response = await axios.put(
      `${base_url}activity/update-activity/${activity.id}`,
      {
        title: activity.activityData.title,
        description: activity.activityData.description,
        icon: activity.activityData.icon,
      }
    );

    if (response.status === 200) {
      toast.success("Activity Data Updated");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const createActivity = async (activity) => {
  try {
    const response = await axios.post(
      `${base_url}activity/create-activity`,
      activity
    );
    if (response.status === 200) {
      toast.success("Activity created successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}activity/delete-activity/${id}`
    );
    if (response.status === 200) {
      toast.success("Activity Deleted Successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

const activityService = {
  getActivities,
  getSingleActivity,
  updateActivity,
  deleteActivity,
  createActivity
};
export default activityService;
