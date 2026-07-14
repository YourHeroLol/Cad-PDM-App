import CADFileCard from "./CADFileCard";

function CADFileLibrary({ files, onSelectFile, checkOutFile, checkInFile }) {
  if (files.length === 0) {
    return <p className="empty-state">No CAD files match your search.</p>;
  }

  return (
    <div className="cad-file-library">
      {files.map((file) => (
        <CADFileCard
          key={file.id}
          file={file}
          onSelectFile={onSelectFile}
          checkOutFile={checkOutFile}
          checkInFile={checkInFile}
        />
      ))}
    </div>
  );
}

export default CADFileLibrary;
