import { useState } from "react";
import "./App.css";
import ActivityHistory from "./components/ActivityHistory";
import CADFileLibrary from "./components/CADFileLibrary";
import { initialActivities } from "./data/activities";
import { cadFiles } from "./data/cadFiles";

const CURRENT_USER = "Chris";

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function App() {
  const [search, setSearch] = useState("");
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [files, setFiles] = useState(cadFiles);
  const [activities, setActivities] = useState(initialActivities);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedFile =
    files.find((file) => file.id === selectedFileId) ?? null;

  const addActivity = (file, action, version) => {
    const activity = {
      id: crypto.randomUUID(),
      action,
      fileName: file.name,
      user: CURRENT_USER,
      version,
      timestamp: formatTimestamp(new Date()),
    };

    setActivities((currentActivities) => [activity, ...currentActivities]);
  };

  const checkOutFile = (id) => {
    const file = files.find((item) => item.id === id);

    if (!file || file.checkedOut) return;

    setFiles((currentFiles) =>
      currentFiles.map((item) =>
        item.id === id
          ? { ...item, checkedOut: true, checkedOutBy: CURRENT_USER }
          : item,
      ),
    );

    addActivity(file, "checked-out", file.version);
  };

  const checkInFile = (id) => {
    const file = files.find((item) => item.id === id);

    if (!file || !file.checkedOut) return;

    const nextVersion = file.version + 1;

    setFiles((currentFiles) =>
      currentFiles.map((item) =>
        item.id === id
          ? {
              ...item,
              checkedOut: false,
              checkedOutBy: null,
              version: nextVersion,
              lastUpdated: new Date().toISOString().slice(0, 10),
            }
          : item,
      ),
    );

    addActivity(file, "checked-in", nextVersion);
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Product data management prototype</p>
          <h1>CAMRE CAD Vault</h1>
          <p className="header-copy">
            Find, review, check out, and track your team&apos;s CAD files.
          </p>
        </div>

        <label className="search-field">
          <span>Search files</span>
          <input
            type="search"
            placeholder="Search CAD files..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header>

      <div className="workspace-grid">
        <section className="file-section" aria-labelledby="files-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Vault contents</p>
              <h2 id="files-heading">CAD Files</h2>
            </div>
            <span className="activity-count">{filteredFiles.length} files</span>
          </div>

          <CADFileLibrary
            files={filteredFiles}
            onSelectFile={(file) => setSelectedFileId(file.id)}
            checkOutFile={checkOutFile}
            checkInFile={checkInFile}
          />
        </section>

        <aside className="details-panel" aria-live="polite">
          {selectedFile ? (
            <>
              <p className="eyebrow">Selected file</p>
              <h2>{selectedFile.name}</h2>

              <dl className="details-list">
                <div>
                  <dt>File</dt>
                  <dd>{selectedFile.fileName}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{selectedFile.fileType}</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{selectedFile.version}</dd>
                </div>
                <div>
                  <dt>Created by</dt>
                  <dd>{selectedFile.createdBy}</dd>
                </div>
                <div>
                  <dt>Last updated</dt>
                  <dd>{selectedFile.lastUpdated}</dd>
                </div>
              </dl>

              <p
                className={`status-badge ${
                  selectedFile.checkedOut
                    ? "status-badge--locked"
                    : "status-badge--available"
                }`}
              >
                {selectedFile.checkedOut
                  ? `Locked by ${selectedFile.checkedOutBy}`
                  : "Available"}
              </p>
            </>
          ) : (
            <div className="empty-details">
              <p className="eyebrow">File details</p>
              <h2>Select a CAD file</h2>
              <p>Choose Details on a file to review its metadata and status.</p>
            </div>
          )}
        </aside>
      </div>

      <ActivityHistory activities={activities} />
    </main>
  );
}

export default App;
