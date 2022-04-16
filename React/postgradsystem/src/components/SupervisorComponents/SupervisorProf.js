import "../../css/newNav.css";
import React, { Component, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SupervisorData } from "../../data/SupervisorData";
import MyStudents from "./MyStudents"


import * as MdIcons from "react-icons/md";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Axios from "axios";
function SupervisorProf() {
  const [URL, setURL] = useState("");
  const [Active, setActive] = useState("");

  let { supervisorId } = useParams();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [userName, setUsername] = useState("");

  const getUserInformation = () => {
    console.log("I am in the supervisorProf, the id is: "+ supervisorId);
    Axios.get(`http://localhost:9000/supervisor/supervisordata/${supervisorId}`).then(
      (res) => {
        console.log(res.data);
        setUsername(res.data[0].firstName + " " + res.data[0].lastName);
      }
    );
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div>
      <Navbar color="light" sticky="top">
        <NavbarBrand className="mr-auto">
          <img src="../guc_O.png" height={50} width={130} alt="GUC"></img>
        </NavbarBrand>

        <Nav navbar></Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <span style={{ fontWeight: "bolder", color: "#1C2D43" }}>
              Hello, {userName} &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <button
              className="edit"
              onClick={() => {
                setURL("My Profile");
              }}
            >
              <MdIcons.MdAccountCircle size="50px"></MdIcons.MdAccountCircle>
            </button>
          </NavItem>
        </Nav>
      </Navbar>

      <Row className="App">
        <div className="col-2">
          <div className="sideBar">
            <ul className="sidebarList">
              <span>
                <div>
                  <br></br>
                </div>
              </span>
              <span id="heading">Supervisor Profile </span>
              <span id="sub-heading">{URL}</span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              {
              
              SupervisorData.map((item, index) => {


                return (
                  <li
                    key={index}
                    className="row"
                    onClick={() => {
                      setURL(item.title);
                    }}
                  >
                    <div id="icon">{item.icon}</div>
                    <div id="title" className="titleSize">
                      {item.title}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="col-10 page">
          {URL === "My Students" ? (
            <MyStudents supervisorId={supervisorId} />
            ) 
          //   : URL === "Reports" ? (
          //   <Reports studentID={studentID}></Reports>
          // ) 
          // : URL === "Thesis" ? (
          //   <Courses studentID={studentID}></Courses>
          // )
          :null}
        </div>
      </Row>
    </div>
  );
}

export default SupervisorProf;