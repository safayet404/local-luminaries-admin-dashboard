import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../components/CustomModal";
import { deleteTeam, getAllTeam } from "../features/team/teamSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: (a, b) => a.designation.length - b.designation.length,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    sorter: (a, b) => a.image.length - b.image.length,
  },
  {
    title: "Facebook",
    dataIndex: "facebook",
    key: "facebook",
    sorter: (a, b) => a.facebook.length - b.facebook.length,
  },
  {
    title: "LinkedIn",
    dataIndex: "linkedin",
    key: "linkedin",
    sorter: (a, b) => a.linkedin.length - b.linkedin.length,
  },
  {
    title: "Instagram",
    dataIndex: "instagram",
    key: "instagram",
    sorter: (a, b) => a.instagram.length - b.instagram.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const TeamList = () => {
  const [open, setOpen] = useState(false);
  const [teamId, setTeamId] = useState("");

  const hideModel = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setTeamId(e);
  };

  const data2 = [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTeam());
  }, []);
  const team_state = useSelector((state) => state.team.teams);
  const teamDetails = useSelector((state) => state.team)
  const {createdTeam,updatedTeam,deletedTeam} = teamDetails
  for (let i = 0; i < team_state.length; i++) {
    data2.push({
      key: i + 1,
      name: team_state[i].name,
      designation: team_state[i].designation,
      image: team_state[i].image,
      facebook: team_state[i].socialMediaLink.facebookLink,
      linkedin: team_state[i].socialMediaLink.linkedinLink,
      instagram: team_state[i].socialMediaLink.instagramLink,
      action: (
        <>
          <Link
            to={`/admin/add-team/${team_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => {
              showModal(team_state[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteTeams = (e) => {
    dispatch(deleteTeam(e));
    setOpen(false);
  };

  useEffect(()=>{
    dispatch(getAllTeam())
  },[createdTeam,updatedTeam,deletedTeam])
  return (
    <div>
      <h3 className="mb-4">Team List</h3>
      <Table columns={columns} dataSource={data2}  scroll={{
                      x: 700,
                    }}></Table>
      <CustomModal
        open={open}
        onCancel={hideModel}
        performAction={() => {
          deleteTeams(teamId);
        }}
        title="Are you sure you want to delete this member?"
      />
    </div>
  );
};

export default TeamList;
