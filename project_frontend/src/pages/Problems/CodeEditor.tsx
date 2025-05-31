"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  selectedLanguage: string; // Add this prop
  setSelectedLanguage: (language: string) => void; // Add this prop
}

const languageExtensions: Record<string, any> = {
  "C++": cpp(),
  JavaScript: javascript(),
  Python: python(),
  Java: java(),
};

const CodeEditor = ({ code, onChange, selectedLanguage, setSelectedLanguage }: CodeEditorProps) => {
  //const [selectedLanguage, setSelectedLanguage] = useState("C++");

  return (
    <div className="h-full w-full border border-border rounded-md overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-2 bg-[#1e1e1e] text-white">
        <div className="flex items-center space-x-4">
          <span>Language:</span>
          <select
            className="bg-[#1e1e1e] border border-gray-500 p-1 rounded text-sm"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {Object.keys(languageExtensions).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CodeMirror Wrapper */}
      <div className="w-full h-full overflow-auto">
        <CodeMirror
          value={code}
          height="calc(100vh - 190px)"
          theme={vscodeDark}
          extensions={[languageExtensions[selectedLanguage]]}
          onChange={onChange}
          className="w-full"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            syntaxHighlighting: true,
            foldGutter: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
 