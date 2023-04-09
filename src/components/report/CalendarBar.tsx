/* eslint-disable react-hooks/exhaustive-deps */
import color from "@/constants/colors";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export type CalendarBarMode = "daily" | "weekly" | "monthly";
export type CalendarDisplayMode = "chart" | "list";

type CalendarBarProps = {
  initialDate?: dayjs.Dayjs;
  onSelectDate?: (d: dayjs.Dayjs) => void;
  onSelectMode?: (m: CalendarBarMode) => void;
  onSelectDisplay?: (d: CalendarDisplayMode) => void;
};

export default function CalendarBar({
  initialDate,
  onSelectDate,
  onSelectMode,
  onSelectDisplay,
}: CalendarBarProps) {
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  const currentDate = dayjs();

  const [selected, setSelected] = useState<CalendarBarMode>("daily");
  const [display, setDisplay] = useState<CalendarDisplayMode>("chart");

  const [selectDate, setSelectDate] = useState(initialDate || currentDate);
  const [sets, setSets] = useState<Array<string[]>>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isExpand, setIsExpand] = useState(false);

  const thisYear = currentDate.year();
  const thisMonth = currentDate.month();
  const daysInMonth = currentDate.daysInMonth();
  const dayInWeek = currentDate.day() - 1;

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const weekDayOf1 = dayObjOf1.day() - 1;

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const weekDayOfLast = dayObjOfLast.day() - 1;

  const startDate = currentDate.subtract(3, "day");
  const endDate = currentDate.add(3, "day");

  useEffect(() => {
    const data = dayjs.calendarSets().current();
    let frame = 0;
    const current = currentDate.format("YYYY-MM-DD");

    for (let i = 0; i < data.length; i++) {
      const weeks = data[i];
      if (weeks.includes(current)) {
        frame = i;
        break;
      }
    }

    for (let i = 0; i < data[0].length; i++) {
      if (weekDayOf1 > i) {
        data[0][i] = dayObjOf1
          .subtract(weekDayOf1 - i, "day")
          .format("YYYY-MM-DD");
      }
    }

    if (weekDayOfLast >= 0) {
      for (let i = 0; i < data[data.length - 1].length; i++) {
        if (i > weekDayOfLast) {
          data[data.length - 1][i] = dayObjOfLast
            .add(i + 1, "day")
            .format("YYYY-MM-DD");
        }
      }
    }

    setCurrentFrame(frame);
    setSets(data);
  }, []);

  const onSetSelectMode = (m: CalendarBarMode) => {
    setSelected(m);
    onSelectMode?.(m);
  };

  const onSetSelectDisplay = (d: CalendarDisplayMode) => {
    setDisplay(d);
    onSelectDisplay?.(d);
  };

  if (sets.length == 0) return null;

  //   console.log(startDate, endDate);

  //   for (
  //     let d = startDate.toDate();
  //     d < endDate.toDate();
  //     d.setDate(d.getDate() + 1)
  //   ) {
  //     console.log(d);
  //   }

  const renderDayCell = (d: string) => {
    const date = dayjs(d);
    const disabled = date.isAfter(currentDate, "date");
    return (
      <div key={d} className="day-cell">
        <div
          className={classNames("day-item pointer", {
            current: date.isSame(currentDate, "date"),
            active: date.isSame(selectDate, "date"),
            disabled: disabled,
          })}
          onClick={() => {
            if (!disabled) {
              setSelectDate(date);
              onSelectDate?.(date);
            }
          }}
        >
          <p>{date.get("date")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-bar">
      <div className="header">
        <div className="navbar">
          <div
            className={classNames("item pointer", {
              active: selected == "daily",
            })}
            onClick={() => onSetSelectMode("daily")}
          >
            Daily
          </div>
          <div
            className={classNames("item pointer", {
              active: selected == "weekly",
            })}
            onClick={() => onSetSelectMode("weekly")}
          >
            Weekly
          </div>
          <div
            className={classNames("item pointer", {
              active: selected == "monthly",
            })}
            onClick={() => onSetSelectMode("monthly")}
          >
            Monthly
          </div>
        </div>
        <BsBarChartFill
          color={display == "chart" ? color.primary : color.palette.grey02}
          size={20}
          style={{ marginRight: 10 }}
          onClick={() => onSetSelectDisplay("chart")}
        />
        <TfiMenuAlt
          color={display == "list" ? color.primary : color.palette.grey02}
          size={20}
          onClick={() => onSetSelectDisplay("list")}
        />
      </div>
      <div className="body">
        <div className="calendar-container">
          <FiChevronLeft
            color={color.palette.grey02}
            size={24}
            style={{ marginBottom: 3 }}
            onClick={() => {
              if (currentFrame > 0) {
                setCurrentFrame((s) => s - 1);
              }
            }}
          />
          <div style={{ flex: 1 }}>
            <div className="week-container">
              {weekDays.map((e, i) => (
                <div className="week-cell" key={i}>
                  {e}
                </div>
              ))}
            </div>

            {isExpand ? (
              sets.map((set, i) => (
                <div key={i} className="day-row">
                  {set.map(renderDayCell)}
                </div>
              ))
            ) : (
              <div className="day-row">
                {sets[currentFrame].map(renderDayCell)}
              </div>
            )}
          </div>
          <FiChevronRight
            color={color.palette.grey02}
            size={24}
            style={{ marginBottom: 3 }}
            onClick={() => {
              if (currentFrame < sets.length - 1) {
                setCurrentFrame((s) => s + 1);
              }
            }}
          />
          <p
            className="today pointer"
            onClick={() => setSelectDate(currentDate)}
          >
            Today
          </p>
        </div>

        <div className="calendar-expandable">
          <div className="divider" />
          <div
            className="action pointer"
            onClick={() => setIsExpand((s) => !s)}
          >
            {isExpand ? (
              <FiChevronUp color="grey" />
            ) : (
              <FiChevronDown color="grey" />
            )}
          </div>
          <div className="divider" />
        </div>
      </div>
    </div>
  );
}
