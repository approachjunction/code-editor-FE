import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const Navbar = (props) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "Javascript" },
  ];

  const handleChange = (event) => {
    props.setUserLang(event.target.value);
  };

  return (
    <div className="navbar bg-blue-50 flex items-center justify-between p-1 w-[98.2%]">
      <div className="text-black justify-start m-2 font-mono font-extralight from-neutral-700 text-lg">
        Approach Junction
      </div>
      <div className=" gap-5 flex justify-start items-center mr-2">
        <FormControl sx={{ minWidth: 120 }} size="small" className="text-white">
          <Select
            value={props.userLang}
            onChange={handleChange}
            displayEmpty
            className="bg-blue-50"
          >
            <MenuItem value="">
              <em>Language</em>
            </MenuItem>
            {languages.map((language) => {
              return (
                <MenuItem key={language.label} value={language.value}>
                  {language.label}
                </MenuItem>
              );
            })}

          </Select>
        </FormControl>
      
        <Button
          variant="contained"
          className="focus:outline-none"
          onClick={props.compile}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
