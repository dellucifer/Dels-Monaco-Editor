import { useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import { FadeLoader } from "react-spinners";
import Axios from 'axios';

function App() {
  const options = {
    fontSize: 18,
  };

  const c = {
    language: "c",
    template: `#include <stdio.h>

int main()
{
    printf("Hello World");
    
    return 0;
}`,
  };

  const cpp = {
    language: "cpp",
    template: `#include <bits/stdc++.h>

using namespace std;

int main()
{
    cout<<"Hello World";

    return 0;
}`,
  };

  const java = {
    language: "java",
    template: `public class Main
{
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
  };

  const python = {
    language: "python",
    template: `# Enter you code here`,
  };

  const [language, setLanguage] = useState(c);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCode, setUserCode] = useState(``);

  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: userCode,
      language: language.language,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  function clearOutput() {}

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => setLanguage(c)}>C</button>
        <button onClick={() => setLanguage(cpp)}>C++</button>
        <button onClick={() => setLanguage(java)}>Java</button>
        <button onClick={() => setLanguage(python)}>Python</button>
      </div>

      <div className="main__container">
        {/* Left Container */}
        <div className="left__container">
          <Editor
            // height="100vh"
            minimap="true"
            language={language.language}
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme="vs-dark"
            value={language.template}
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="button__run" onClick={() => compile()}>
            Run
          </button>
        </div>

        {/* Right Container */}
        <div className="right__container">
          {/* Input Box */}
          <p>Input:</p>
          <div className="right__input">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>

          {/* Output Box */}
          <p>Output:</p>
          {loading ? (
            <div className="spinner__box">
              <div>
                <FadeLoader color="#009DFF" />
              </div>
            </div>
          ) : (
            <div className="output__box">
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="button__clear"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          zIndex: 10,
          position: "absolute",
          bottom: 0,
          marginLeft: "10px",
        }}
      >
        Powered by Dellucifer
      </div>
    </div>
  );
}

export default App;
