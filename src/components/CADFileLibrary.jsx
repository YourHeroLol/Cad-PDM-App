import CADFileCard from "./CADFileCard";

function CADFileLibrary({ files, onSelectFile, checkOutFile, checkInFile }) {
  return (
    <>
      {files.map((file) => (
        <CADFileCard
          key={file.id}
          file={file}
          onSelectFile={onSelectFile}
          checkOutFile={checkOutFile}
          checkInFile={checkInFile}
        />
      ))}
    </>
  );
}

export default CADFileLibrary;