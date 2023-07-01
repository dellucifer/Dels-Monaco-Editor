import { useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";

function App() {
  const options = {
    fontSize: 18,
  };

  const c = {
    language: 'c',
    template: `#include <stdio.h>

int main()
{
    printf("Hello World");
    
    return 0;
}`
  }

  const cpp = {
    language: 'cpp',
    template: `#include <bits/stdc++.h>

using namespace std;

int main()
{
    cout<<"Hello World";

    return 0;
}`
  }

  const java = {
    language: 'java',
    template: `public class Main
{
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`
  }

  const python = {
    language: 'python',
    template: `# Enter you code here`
  }

  const [language, setLanguage] = useState(c);

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => setLanguage(c)}>C</button>
        <button onClick={() => setLanguage(cpp)}>C++</button>
        <button onClick={() => setLanguage(java)}>Java</button>
        <button onClick={() => setLanguage(python)}>Python</button>
      </div>

      <div className="editor">
        <Editor
          // height="100vh"
          minimap="true"
          language={language.language}
          options={options}
          height="calc(100vh - 50px)"
          width="100%"
          theme="vs-dark"
          value={language.template}
        />
      </div>
      <div style={{zIndex: 10, position: "absolute", bottom: 0, marginLeft: "10px"}}>Powered by Dellucifer</div>
    </div>
  );
}

export default App;
