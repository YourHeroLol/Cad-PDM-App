import "./App.css";
import CADFileLibrary from "./components/CADFileLibrary";
import { cadFiles } from "./data/cadFiles";
import { useState } from "react";



function App() {
  const [search, setSearch] = useState("");

  const [selectedFileId, setSelectedFileId] = useState(null);

  const selectedFile =
    files.find((file) => file.id === selectedFileId) ?? null;

  const [files, setFiles] = useState(cadFiles);

  const filteredFiles = files.filter((file) =>
  file.name.toLowerCase().includes(search.toLowerCase())
);

  const checkOutFile = (id) => {
  setFiles(
    files.map((file) =>
      file.id === id
        ? {
            ...file,
            checkedOut: true,
            checkedOutBy: "Chris",
          }
        : file
      )
    );
  };

  const checkInFile = (id) => {
  setFiles(
    files.map((file) =>
      file.id === id
        ? {
            ...file,
            checkedOut: false,
            checkedOutBy: null,
            version: file.version + 1,
          }
        : file
      )
    );
  };


  
  return (
    

    <div>
      <h1>CAMRE CAD Vault</h1>
      <input
        type="text"
        placeholder="Search CAD files..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <CADFileLibrary
      files={filteredFiles}
      onSelectFile={(file) => setSelectedFileId(file.id)}
      checkOutFile={checkOutFile}
      checkInFile={checkInFile}
      />

      

      {selectedFile && (
      <div className="details-panel">
        <h2>{selectedFile.name}</h2>

        <p>File: {selectedFile.fileName}</p>
        <p>Type: {selectedFile.fileType}</p>
        <p>Version: {selectedFile.version}</p>
        <p>Created By: {selectedFile.createdBy}</p>
        <p>Last Updated: {selectedFile.lastUpdated}</p>

        <p>
          {selectedFile.checkedOut
            ? `Locked by ${selectedFile.checkedOutBy}`
            : "Available"}
        </p>
      </div>
    )}
    </div>
  );
}



export default App;