import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteCupon, getCupons } from "../features/cupon/cuponSlice";
import CustomModal from "../components/CustomModal";
const columns = [
    {
      title: "SNo",
      dataIndex: "key",
     
    },
    {
      title: "Cupon Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry",
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "name",
    },
   
    {
      title: "Action",
      dataIndex: "action",
     
    },
  ];
const CuponList = () => {

  const [open,setOpen] = useState(false)
  const [cuponId,setCuponId] = useState("")

  const showModal = (e) =>{
    setOpen(true)
    setCuponId(e)
  }
  const hideModal = ()=>{
    setOpen(false)
  }     
      const data2 = [];
    
     
      const dispatch = useDispatch()
      useEffect(()=>{
        dispatch(getCupons())
      },[])

      const cupon_state = useSelector((state)=> state.cupon.cupons)
      console.log(cupon_state)
      for (let i = 0; i < cupon_state.length; i++) {
        data2.push({
          key: i+1,
          name: cupon_state[i].name,
          expiry: cupon_state[i].expiry,
          discount: cupon_state[i].discount,
          action : (
            <>
              <Link to={`/admin/add-cupon/${cupon_state[i]._id}`} className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=> showModal(cupon_state[i]._id)}>
                <AiFillDelete />
              </button>
            </>
          ),
          
        });
      }
      const deleteCupons = (e)=>{
        dispatch(deleteCupon(e))
        setOpen(false)
        setTimeout(()=>{
          dispatch(getCupons())
        },100)
      }
  return (
    <div>
        <h3 className="mb-4">Color list</h3>
       <div>
       <Table columns={columns} dataSource={data2}></Table>
       </div>
       <CustomModal title="Are you sure you want to delete this cupon?" open={open} onCancel={hideModal} performAction={()=> deleteCupons(cuponId)} />
       
    </div>
  )
}

export default CuponList