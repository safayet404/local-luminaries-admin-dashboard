import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllOrder } from "../features/order/orderSlice";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      
    },
    {
      title: "name",
      dataIndex: "name",
 
    },
    {
      title: "Amount",
      dataIndex: "amount",
     
    },
    {
      title: "Tour",
      dataIndex: "tour",
     
    },
    {
      title: "View Order",
      dataIndex: "view",
     
    },
    {
      title: "Action",
      dataIndex: "action",
     
    },
  ];
const Orders = () => {
    
      const data2 = [];
    
      const dispatch = useDispatch()
      useEffect(()=>{
        dispatch(getAllOrder())
      },[])
      const order_state = useSelector((state) => state.all_orders.orders )
      
      for (let i = 0; i < order_state.length; i++) {
        data2.push({
          key: i+1,
          name: order_state[i].firstName ,
          // product: (
          //   <Link to={`/admin/view-order/${order_state[i].orderby._id}`}>
          //     View Orders
          //   </Link>
          // ),
          view : (
            <Link to={`/admin/view-order/${order_state[i]._id}`}>
                View Orders
               </Link>
          ),
          amount : order_state[i].totalAmount,
          
          action: (
            <>
              <Link to="/" className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <Link className="ms-3 fs-3 text-danger" to="/">
                <AiFillDelete />
              </Link>
            </>
          ),
        });
      }
  return (
    <div>
        <h3>Orders</h3>
        <Table columns={columns} dataSource={data2}></Table>
    </div>
  )
}

export default Orders