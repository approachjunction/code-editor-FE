import "./App.css";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  const [userCode, setUserCode] = useState(``);
  const [userLang, setUserLang] = useState("");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    fontSize: fontSize,
    scrollbar: {
      vertical: "hidden",
    },
    formatOnType: true,
    formatOnPaste: true,
    dragAndDrop: true,
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const compile = async () => {
    setIsLoading(true);
    console.log(userLang);
    if (userLang.length == 0) {
      alert("Please select a language!");
    }
    setUserOutput("");
    if (userCode === "") {
      return;
    }
    await axios.post("http://localhost:3001/compile", {
      code: userCode,
      lang: userLang,
      input: userInput,
    })
      .then((resp) => {
        console.log(resp);
        setUserOutput(resp.data.stderr || resp.data.stdout);
      })
      .catch((err) => {
        console.log("Error in compiling", err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };
  const lines = userOutput.split("\r\n");
  console.log(lines);
  return (
    <div className="App flex w-[100%] h-[100vh] border">
      <div className="left-component relative w-[70%]">
        <Navbar
          compile={compile}
          userLang={userLang}
          setUserLang={setUserLang}
        />
        <Editor
          height="100vh"
          width="100%"
          theme="vs-dark"
          language={userLang}
          defaultLanguage="python"
          defaultValue="# Enter your code here"
          onChange={(value) => {
            setUserCode(value);
          }}
          options={options}
        />
      </div>
      <div className="right-component relative w-[30%]">
        <h3>Input:</h3>
        <div className="input h-1/3">
          <textarea
            name=""
            id=""
            value={userInput}
            onChange={handleInputChange}
            className="flex-[50%] w-full h-full border-none outline-none resize-none p-2"
          ></textarea>
        </div>
        <h3>Output</h3>
        {isLoading ? (
          <div className="output border h-2/3 bg-white flex justify-center text-black p-2 font-medium overflow-auto">
            <img src="/Ripple-0.7s-200px.svg" />
          </div>
        ) : (
          <div className="output border h-2/3 bg-white text-black p-2 font-medium overflow-auto">
            {lines.map((line, index) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
