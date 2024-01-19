import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkmodeToggle() {
  const { isDarkMode, toggleDark } = useDarkMode();
  return (
    <ButtonIcon
      onClick={() => {
        toggleDark();
      }}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
