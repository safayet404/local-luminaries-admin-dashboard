import { List, Card, Row, Col } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, getOrderByUser, getOrders } from "../features/order/orderSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      
    },
    {
      title: "Name",
      dataIndex: "name",
 
    },
    {
      title: "Brand",
      dataIndex: "brand",
     
    },
    {
      title: "Count",
      dataIndex: "count",
     
    },
    {
      title: "Color",
      dataIndex: "color",
     
    },
    {
      title: "Amount",
      dataIndex: "amount",
     
    },
    {
      title: "Date",
      dataIndex: "date",
     
    },
    {
      title: "Action",
      dataIndex: "action",
     
    },
  ];
const ViewOrder = () => {
    
      const data2 = [];
    
      const dispatch = useDispatch()
      useEffect(()=>{
        dispatch(getAllOrder())
      },[])
      const orderState = useSelector((state) => state.all_orders.orders )
      const data = orderState.map((order, index) => ({
        key: index + 1,
        name: order.firstName,
        amount: order.totalAmount,
        tour: order.tour,
        action: (
          <>
            <Link to="/" className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      }));

      // for (let i = 0; i < order_state.length; i++) {
      //   data2.push({
      //     key: i+1,
      //     name: order_state[i].firstName,
         
        
          
        
      //     action: (
      //       <>
      //         <Link to={`/admin/view-order/${order_state[i]._id}`} className=" fs-3 text-danger">
      //           <BiEdit />
      //         </Link>
      //         <Link className="ms-3 fs-3 text-danger" to="/">
      //           <AiFillDelete />
      //         </Link>
      //       </>
      //     ),
      //   });
      // }
  return (
    <div>
      <h3>Orders</h3>
      {orderState.map((order, index) => (
        <div key={index} className="order-table">
          <table>
            <tbody>
              <tr>
                <td className="left"><b>Name:</b></td>
                <td className="right">{order.firstName + " " + order.lastName}</td>
              </tr>
              <tr>
                <td className="left"><b>Email:</b></td>
                <td className="right">{order.email}</td>
              </tr>
              <tr>
                <td className="left"><b>Mobile:</b></td>
                <td className="right">{order.mobile}</td>
              </tr>
              <tr>
                <td className="left"><b>House:</b></td>
                <td className="right">{order.address?.house}</td>
              </tr>
              <tr>
                <td className="left"><b>Road:</b></td>
                <td className="right">{order.address?.road}</td>
              </tr>
              <tr>
                <td className="left"><b>City:</b></td>
                <td className="right">{order.address?.city}</td>
              </tr>
              <tr>
                <td className="left"><b>Post Code:</b></td>
                <td className="right">{order.address?.postCode}</td>
              </tr>
              <tr>
                <td className="left"><b>Tour:</b></td>
                <td className="right">{order.tour}</td>
              </tr>
              <tr>
                <td className="left"><b>Person:</b></td>
                <td className="right">{order.person}</td>
              </tr>
              <tr>
                <td className="left"><b>Price:</b></td>
                <td className="right">{order.price}</td>
              </tr>
              <tr>
                <td className="left"><b>Total Amount:</b></td>
                <td className="right">{order.price} * {order.person}</td>
              </tr>
              <tr>
                <td className="left"><b>Paid Amount:</b></td>
                <td className="right">{order.paidAmount}</td>
              </tr>
              <tr>
                <td className="left"><b>Due Amount:</b></td>
                <td className="right">{order.dueAmount}</td>
              </tr>
             
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default ViewOrder