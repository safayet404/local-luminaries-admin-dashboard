import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import colorReducer from "../features/color/colorSlice";
import cuponReducer from "../features/cupon/cuponSlice";
import blogReducer from "../features/blog/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import orderReducer from "../features/order/orderSlice";
import tourSlice from "../features/tour/tourSlice";
import destinationReducer from "../features/destination/destinationSlice";
import activityReducer from "../features/activity/activitySlice";
import teamReducer from "../features/team/teamSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    tour : tourSlice,
    team : teamReducer,
    destination : destinationReducer,
    activity : activityReducer,
    color : colorReducer,
    cupon : cuponReducer,
    blog : blogReducer,
    enquiry : enquiryReducer,
    all_orders : orderReducer,
  },
});
