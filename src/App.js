import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import BlogCategoryList from "./pages/BlogCategoryList";
import TourList from "./pages/TourList";
import TeamList from "./pages/TeamList";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/ActivityList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddTour from "./pages/AddTour";
import AddActivity from "./pages/AddActivity";
import AddCupon from "./pages/AddCupon";
import CuponList from "./pages/CuponList";
import AddImage from "./pages/AddImage";
import ViewEnquiries from "./pages/ViewEnquiries";
import ViewOrder from "./pages/ViewOrder";
import AddDestination from "./pages/AddDestination";
import DestinationList from "./pages/DestinationList";
import AddTeam from "./pages/AddTeam";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>

            <Route path="enquiries" element={<Enquiries />}></Route>
            <Route path="view-enquiry/:id" element={<ViewEnquiries />}></Route>
            
            <Route path="blog-list" element={<BlogList />}></Route>
            <Route path="add-destination" element={<AddDestination />}></Route>
            <Route path="add-destination/:id" element={<AddDestination />}></Route>
            <Route path="destination-list" element={<DestinationList />}></Route>
            <Route path="add-blog" element={<AddBlog />}></Route>
            <Route path="add-blog/:id" element={<AddBlog />}></Route>
            <Route path="add-blog-category" element={<AddBlogCategory />}></Route>
            <Route path="blog-category-list" element={<BlogCategoryList />}></Route>

            <Route path="booking" element={<Orders />}></Route>
            <Route path="view-order/:id" element={<ViewOrder />}></Route>

            <Route path="customers" element={<Customers />}></Route>

            <Route path="tour-list" element={<TourList />}></Route>


            <Route path="tour" element={<AddTour />}></Route>
            <Route path="edit-tour/:id" element={<AddTour />}></Route>

            <Route path="add-activity" element={<AddActivity />}></Route>
            <Route path="add-activity/:id" element={<AddActivity />}></Route>
            <Route path="activity-list" element={<CategoryList />}></Route>

            <Route path="add-team" element={<AddTeam />}></Route>
            <Route path="add-team/:id" element={<AddTeam />}></Route>
            <Route path="team-list" element={<TeamList />}></Route>



            <Route path="color-list" element={<ColorList />}></Route>
            <Route path="add-colors" element={<AddColor />}></Route>
            <Route path="add-color/:id" element={<AddColor />}></Route>

         
         


            <Route path="cupon-list" element={<CuponList />}></Route>
            <Route path="add-cupon" element={<AddCupon />}></Route>
            <Route path="add-cupon/:id" element={<AddCupon />}></Route>
            <Route path="add-image" element={<AddImage />}></Route>
            
           
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
