import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, deleteCategory, getActivities, getCategories } from "../features/activity/activitySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
     
    },
    {
      title: "Title",
      dataIndex: "title",
    
    },
    {
      title: "Description",
      dataIndex: "description",
    
    },
    {
      title: "Icon",
      dataIndex: "icon",
    
    },
    {
      title: "Action",
      dataIndex: "action",
     
    },
   
  ];
const ActivityList = () => {

  const [open,setOpen] = useState(false)
  const [activityId,setActivityId] = useState("")

  const showModal = (e) =>{
    setOpen(true)
    setActivityId(e)
  }
  const hideModal = () =>{
    setOpen(false)
  }
    
      const data2 = [];
    
      const dispatch = useDispatch()
      useEffect(()=>{
        dispatch(getActivities())
      },[])

      const activityDetails = useSelector((state) => state.activity)
      const activity_state = useSelector((state)=> state.activity.activities)

      const {createdActivity,updatedActivity,deletedActivity} = activityDetails
      
      for (let i = 0; i < activity_state.length; i++) {
        data2.push({
          key: i+1,
          title: activity_state[i].title,
          description: activity_state[i].description,
          icon: activity_state[i].icon,
          action : (
            <>
              <Link to={`/admin/add-activity/${activity_state[i]._id}`} className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <button className="ms-3 fs-3 text-danger bg-transparent border-0" 
              onClick={()=>showModal(activity_state[i]._id)}>
                <AiFillDelete />
              </button>
            </>
          ),
         
        });
      }
    
      const deleteActivities = (e) =>{
        dispatch(deleteActivity(e))
        setOpen(false)
      }
      useEffect(()=>{
        dispatch(getActivities())
      },[createdActivity,updatedActivity,deletedActivity])
     
  return (
    <div>
        <h3 className="mb-4">Activity List</h3>
        <div>
        <Table columns={columns} dataSource={data2}></Table>
        </div>
        <CustomModal 
        onCancel={hideModal}
        open={open}
        performAction={()=>{
          deleteActivities(activityId)
        }}
        title="Are you sure you want to delete this activity?"
         />
        
    </div>
  )
}

export default ActivityList