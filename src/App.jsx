import "./App.css";
import CADFileLibrary from "./components/CADFileLibrary";
import { cadFiles } from "./data/cadFiles";
import { useState } from "react";



function App() {
  const [search, setSearch] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

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
    

    <div className = "vault-header">
      <h1>CAMRE CAD Vault</h1>
      <input
        type="text"
        placeholder="Search CAD files..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="vault-layout">

        <div className="file-list">
          <CADFileLibrary
            files={filteredFiles}
            onSelectFile={setSelectedFile}
            checkOutFile={checkOutFile}
            checkInFile={checkInFile}
          />
        </div>

        <div className="details-panel">
          {selectedFile ? (
            <>
              <h2>{selectedFile.name}</h2>

                <table className="details-table">
                  <tbody>
                    <tr>
                      <th>File</th>
                      <td>{selectedFile.fileName}</td>
                    </tr>

                    <tr>
                      <th>Type</th>
                      <td>{selectedFile.fileType}</td>
                    </tr>

                    <tr>
                      <th>Version</th>
                      <td>{selectedFile.version}</td>
                    </tr>

                    <tr>
                      <th>Created By</th>
                      <td>{selectedFile.createdBy}</td>
                    </tr>

                    <tr>
                      <th>Last Updated</th>
                      <td>{selectedFile.lastUpdated}</td>
                    </tr>

                    <tr>
                      <th>Status</th>
                      <td>
                        {selectedFile.checkedOut
                          ? `🔒 Locked by ${selectedFile.checkedOutBy}`
                          : "🟢 Available"}
                      </td>
                    </tr>
                  </tbody>
                </table>
            </>
          ) : (
            <p>Select a file to view its details.</p>
          )}
        </div>
        
      </div>
    </div>
  );
}



export default App;