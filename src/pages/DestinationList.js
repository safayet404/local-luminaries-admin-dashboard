import { Table } from "antd";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDestination, getDestination } from "../features/destination/destinationSlice";

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
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const DestinationList = () => {

    const [open,setOpen] = useState(false)
    const [destinationId,setDestinationId] = useState("")
  
    const showModal = (e) =>{
      setOpen(true)
      setDestinationId(e)
    }
    const hideModal = ()=>{
      setOpen(false)
    }     
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDestination());
  }, []);
  const destination_state = useSelector((state) => state.destination.destinations);
  const destinatinDetails = useSelector((state)=> state.destination)
  const {createdDestination,deletedDestination,updatedDestination} = destinatinDetails
  const data1 = [];
  for (let i = 0; i < destination_state.length; i++) {
    if (destination_state[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: destination_state[i].name,
        image: destination_state[i].image,
        action : (
            <>
              <Link to={`/admin/add-destination/${destination_state[i]._id}`} className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=> showModal(destination_state[i]._id)}>
                <AiFillDelete />
              </button>
            </>
          ),
       
      });
    }
  }

  useEffect(()=>{
    dispatch(getDestination())
  },[createdDestination,deletedDestination,updatedDestination])
  const deleteDestinations = (e) =>{
    dispatch(deleteDestination(e))
    setOpen(false)
  }

  return (
    <div>
      <h3 className="mb-4 title">Destinations</h3>
      <div>
        <Table columns={columns} dataSource={data1}  scroll={{
                      x: 700,
                    }} />
        <CustomModal open={open} title="Are you sure you want to delete this?" onCancel={hideModal} performAction={()=>{
        deleteDestinations(destinationId)
      }} />
      </div>
    </div>
  );
};

export default DestinationList;