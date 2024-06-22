import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTour, getTours } from "../features/tour/tourSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import ChangeDateFormat from "../components/ChangeDateFormat";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "image",
    dataIndex: "image",
    key: "image",
    sorter: (a, b) => a.image.length - b.image.length,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    sorter: (a, b) => a.duration.length - b.duration.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const TourList = () => {
  const [open,setOpen] = useState(false)
  const [tourId,setTourId] = useState("")

  const hideModel = () =>{
    setOpen(false)
  }
  const showModal = (e) =>{
    setOpen(true)
    setTourId(e)

  }
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTours());
  }, []);
  const tour_state = useSelector((state) => state.tour.tours);
  const tour_details = useSelector((state) => state.tour)

  const {createdTour,deletedTour,updatedTour} = tour_details
  const splitTitle = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + " ...";
  };



  const data2 = [];
  for (let i = 0; i < tour_state.length; i++) {
    data2.push({
      key: i + 1,
      title: tour_state[i].title,
      description: (
        <p
          dangerouslySetInnerHTML={{ __html: splitTitle(tour_state[i].description ,25) }}
        ></p>
      ),
     
     
      date: `${ChangeDateFormat(tour_state[i].date)}`,
      price: `${tour_state[i].price}`,
   
      image: tour_state[i].image,
      duration: tour_state[i].duration,
    
      action: (
        <>
          <Link to={`/admin/edit-tour/${tour_state[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger border-0 bg-transparent" onClick={()=>{
            showModal(tour_state[i]._id)
          }}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  useEffect(()=>{
    dispatch(getTours())
  },[createdTour,deletedTour,updatedTour])
  const deleteTours = (e) =>{
    dispatch(deleteTour(e))
    setOpen(false)
  }
  return (
    <div>
      <h3 className="mb-4">Tour List</h3>
      <Table
        columns={columns}
        dataSource={data2}
        scroll={{
          x: 700,
        }}
      ></Table>
      <CustomModal
        open={open}
        title="Are you sure you want to delete this product?"
        onCancel={hideModel}
        performAction={() => {
          deleteTours(tourId);
        }}
      />
    </div>
  );
};

export default TourList;
