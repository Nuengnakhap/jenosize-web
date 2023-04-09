import React, { useState } from "react";
import CalendarBar, {
  CalendarBarMode,
  CalendarDisplayMode,
} from "../CalendarBar";
import dayjs from "dayjs";
import { AiFillLike, AiOutlineGift, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoDiamondOutline, IoPersonCircleSharp } from "react-icons/io5";
import color from "@/constants/colors";
import { Line } from "react-chartjs-2";
import classNames from "classnames";

export default function EngagementScene() {
  const [date, setDate] = useState(dayjs());
  const [mode, setMode] = useState<CalendarBarMode>("daily");
  const [display, setDisplay] = useState<CalendarDisplayMode>("chart");
  const [activeMenu, setActiveMenu] = useState<
    "like" | "comment" | "point" | "diamond"
  >("like");

  const renderDetail = () => {
    if (mode === "daily") {
      return (
        <div className="summary-body">
          <div className="summary-row">
            <div className="summary-cell">
              <div className="summary-title">
                <AiOutlineLike
                  color={color.primary}
                  className="mr-2"
                  size={20}
                />
                <p className="text-primary">Like</p>
              </div>
              <h2 className="summary-value">34</h2>
              <p className="summary-desc">Likes</p>
            </div>
            <div className="summary-cell">
              <div className="summary-title">
                <FaRegCommentAlt
                  color={color.primary}
                  className="mr-2"
                  size={20}
                />
                <p className="text-primary">Comment</p>
              </div>
              <h2 className="summary-value">56</h2>
              <p className="summary-desc">Comments</p>
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-cell">
              <div className="summary-title">
                <AiOutlineGift
                  color={color.primary}
                  className="mr-2"
                  size={20}
                />
                <p className="text-primary">Point</p>
              </div>
              <h2 className="summary-value">450</h2>
              <p className="summary-desc">Point</p>
            </div>
            <div className="summary-cell">
              <div className="summary-title">
                <IoDiamondOutline
                  color={color.primary}
                  className="mr-2"
                  size={20}
                />
                <p className="text-primary">Diamond</p>
              </div>
              <h2 className="summary-value">40</h2>
              <p className="summary-desc">Diamond</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="weekly-body">
        <div className="weekly-menu">
          <div
            className={classNames("menu", { active: activeMenu == "like" })}
            onClick={() => setActiveMenu("like")}
          >
            <AiOutlineLike
              color={activeMenu !== "like" ? color.primary : "#FFF"}
              className="mr-2"
              size={14}
            />
            <p className="text-primary">Like</p>
          </div>
          <div
            className={classNames("menu", { active: activeMenu == "comment" })}
            onClick={() => setActiveMenu("comment")}
          >
            <FaRegCommentAlt
              color={activeMenu !== "comment" ? color.primary : "#FFF"}
              className="mr-2"
              size={14}
            />
            <p className="text-primary">Comment</p>
          </div>
          <div
            className={classNames("menu", { active: activeMenu == "point" })}
            onClick={() => setActiveMenu("point")}
          >
            <AiOutlineGift
              color={activeMenu !== "point" ? color.primary : "#FFF"}
              className="mr-2"
              size={14}
            />
            <p className="text-primary">Point</p>
          </div>
          <div
            className={classNames("menu", { active: activeMenu == "diamond" })}
            onClick={() => setActiveMenu("diamond")}
          >
            <IoDiamondOutline
              color={activeMenu !== "diamond" ? color.primary : "#FFF"}
              className="mr-2"
              size={14}
            />
            <p className="text-primary">Diamond</p>
          </div>
        </div>
        {renderDisplay()}
      </div>
    );
  };

  const renderDisplay = () => {
    if (display == "chart") {
      return (
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                display: false,
              },
              title: { display: false },
            },
            scales: { y: { beginAtZero: true } },
          }}
          data={{
            labels: [11, 12, 13, 14, 15, 16, 17],
            datasets: [
              {
                label: "Dataset 1",

                data: [
                  { x: 11, y: 30 },
                  { x: 12, y: 50 },
                  { x: 13, y: 40 },
                  { x: 14, y: 55 },
                  { x: 15, y: 80 },
                  { x: 16, y: 30 },
                  { x: 17, y: 60 },
                ],
                borderColor: color.primary,
                backgroundColor: color.primary,
              },
            ],
          }}
        />
      );
    }
    return (
      <div className="data-list">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="data-row">
            <div className="data-no">{i + 1}</div>
            <div className="data-body">
              <div className="detail" style={{ flex: 1, paddingLeft: 5 }}>
                <IoPersonCircleSharp
                  color="#AFAFAF"
                  size={40}
                  style={{ marginRight: 4 }}
                />
                <div>
                  <p>First Name</p>
                  <p style={{ fontSize: 12 }}>description</p>
                </div>
              </div>
              <div className="divider" />
              <div className="detail">
                <AiFillLike color={color.primary} className="mr-2" size={20} />
                <p style={{ fontSize: 10 }}>10 People Likes</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="engagement">
      <CalendarBar
        initialDate={date}
        onSelectDate={setDate}
        onSelectMode={setMode}
        onSelectDisplay={setDisplay}
      />
      <div className="body">
        <p className="title-date">{date.format("DD MMMM YYYY")}</p>
        {renderDetail()}
      </div>
    </div>
  );
}
