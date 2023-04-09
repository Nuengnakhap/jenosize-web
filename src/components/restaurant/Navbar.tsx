/* eslint-disable @next/next/no-img-element */
import color from "@/constants/colors";
import React from "react";
import { BiSearch } from "react-icons/bi";

type NavbarProps = {
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPressSearch?: () => void;
};

export default function Navbar({
  onSearch,
  onKeyDown,
  onPressSearch,
}: NavbarProps) {
  return (
    <div className="navbar">
      <img src="/logo.png" className="logo" alt="logo" />
      <h1 className="title">Restaurant</h1>
      <div className="search-input">
        <input
          placeholder="Search..."
          onChange={onSearch}
          onKeyDown={onKeyDown}
        />
        <div className="search-btn pointer" onClick={onPressSearch}>
          <BiSearch color={color.restaurant.primary} size={20} />
        </div>
      </div>
    </div>
  );
}
