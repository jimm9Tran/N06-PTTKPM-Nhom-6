import React from 'react';
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
  // console.log(element);
  // console.log("Current theme:", theme);


  return (
    <div className='relative '>
        <img
          onClick={() => setTheme(theme === "dark"?"light":"dark")} 
          src={LightButton} alt="" 
          className={`w-12 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`} />

        <img onClick={() => setTheme(theme === "dark"?"light":"dark")} src={DarkButton} alt="" className={`w-12 cursor-pointer `} />
    </div>
  )
};

export default DarkMode;