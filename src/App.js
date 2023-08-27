import { useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import { FadeLoader } from "react-spinners";
// import Axios from "axios"; -------> Again fk axios

function App() {
  const options = {
    fontSize: 18,
  };


// User Code Templates
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

  const [language, setLanguage] = useState(cpp);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCode, setUserCode] = useState(``);
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("")
  const [colour, setColour] = useState("white")

  const compile = async () => {
    setColour("white")
    setLoading(true);
    if (userCode === ``) {
      setLoading(false);
      return;
    }

    // Post request to compile endpoint
    try{
      // console.log(btoa(userCode), language.language)
      // console.log(userCode)
      setStatus("");
      setJobId("");
      setUserOutput("");
      
      const data = await fetch(`http://localhost:8000/run`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        language: language.language,
        code: btoa(userCode)
      })
    })

    const res = await data.json();
    // console.log(res)
    setJobId(res.jobId);
    setLoading(false);
    let intervalId;

    intervalId = setInterval(async () => {
            // const {data: dataRes} = await Axios.get(`http://localhost:8000/status`, {params: {id: res.data.jobId}})
          const fetchJob = await fetch(`http://localhost:8000/status?id=${res.jobId}`, {
            method: "GET",
          })
          const resData = await fetchJob.json();
          // console.log(resData);
          const {success, job, error} = resData;

          if(success){
            const {status: jobStatus, output: jobOutput} = job;
            setStatus(jobStatus);
            if(jobStatus==='pending') return;

            setUserOutput(jobOutput);
            setColour("#03fc45");
            clearInterval(intervalId);
          } else {
            setStatus("Error!")
            console.error(error);
            setUserOutput(error);
            clearInterval(intervalId);
          }

          }, 1000)

    } catch(errorD) {
      console.log(errorD);
        if(language.language==='cpp' || language.language==='c'){
          setUserOutput(errorD?.response?.data?.err?.stderr);
        }
        if(language.language==='python'){
          setUserOutput(errorD?.response?.data?.err?.error);
        }
        setColour("red")
        setLoading(false);
    }
  }


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
          <div className="right__input">
            <p style={{color: colour}}>{status}</p>
            <p>{jobId && `JobId: ${jobId}`}</p>
            {/* <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            >
            </textarea> */}
          </div>

          {/* Output Box */}
          <p style={{fontWeight: 600}}>Output:</p>
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
                  setUserOutput("");
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
