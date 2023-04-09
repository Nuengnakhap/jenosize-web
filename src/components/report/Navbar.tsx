import React from "react";
import { IoHome } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="navbar">
      <IoHome color="#FFF" />
      <h4 className="title">All Report</h4>
      <MdOutlineFilterList color="#FFF" />
    </div>
  );
}
