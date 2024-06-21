import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { TfiDashboard } from "react-icons/tfi";
import { GiCatapult,GiTicket } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { LuLayoutList } from "react-icons/lu";
import {
  AiOutlineBgColors,
  AiFillFileAdd,
  AiOutlineMessage,
} from "react-icons/ai";

import { FaClipboardList, FaBlogger } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo">Local Luminaries</span>
            <span className="sm-logo">LM</span>
          </h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <TfiDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <GiCatapult className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "tour",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Add Tour",
                },
                {
                  key: "tour-list",
                  icon: <BsFillCartCheckFill className="fs-4" />,
                  label: "Tour List",
                },
                {
                  key: "add-destination",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Add Destination",
                },
                {
                  key: "destination-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Destination List",
                },
                {
                  key: "add-activity",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Add Activity",
                },
                {
                  key: "activity-list",
                  icon: <LuLayoutList className="fs-4" />,
                  label: "Activity List",
                },

                {
                  key: "add-team",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Add Team",
                },
                {
                  key: "team-list",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Team List",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
                {
                  key: "add-cupon",
                  icon: <GiTicket className="fs-4" />,
                  label: "Add Cupon",
                },
                {
                  key: "cupon-list",
                  icon: <GiTicket className="fs-4" />,
                  label: "Cupon List",
                },
                {
                  key: "size-list",
                  icon: <GiTicket className="fs-4" />,
                  label: "Size List",
                },
                {
                  key: "add-size",
                  icon: <GiTicket className="fs-4" />,
                  label: "Add Size",
                },
                {
                  key: "add-image",
                  icon: <GiTicket className="fs-4" />,
                  label: "Add Image",
                },
              ],
            },
            {
              key: "booking",
              icon: <FaClipboardList className="fs-4" />,
              label: "Bookings",
            },
            {
              key: "blog",
              icon: <FaBlogger className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: "Add blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBlogger className="fs-4" />,
                  label: "Blog List",
                },
                
              ],
            },
            {
              key: "enquiries",
              icon: <AiOutlineMessage className="fs-4" />,
              label: "Enquery",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="justify-content-between d-flex ps-3 "
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img width={32} height={32} src="images/araf.jpg" alt=" " />
              </div>
              <div
               
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
              >
                <h5>Navdeep</h5>
                <p>hossainsafayet187@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a class="dropdown-item" href="/d">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/d">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/d">
                    Something else here
                  </a>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
