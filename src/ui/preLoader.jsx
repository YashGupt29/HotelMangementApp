import { useEffect } from "react";
import "../styles/preLoader.css";
import { preLoaderAnim } from "../utils/animate";

export const Preloader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Made </span>
        <span>With</span>
        <span>❤️</span>
        <span>By Yash Gupta.</span>
      </div>
    </div>
  );
};
