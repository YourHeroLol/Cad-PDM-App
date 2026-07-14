function CADFileCard({ file, onSelectFile, checkOutFile, checkInFile }) {
  return (
    <div className="cad-file-card">
      <h2>{file.name}</h2>

      {file.checkedOut ? (
        <p>🔒 Checked Out by {file.checkedOutBy}</p>
      ) : (
        <p>🟢 Available</p>
      )}

      <button onClick={() => onSelectFile(file)}>
        Details
      </button>

      {file.checkedOut ? (
        <button onClick={() => checkInFile(file.id)}>
          Check In
        </button>
      ) : (
        <button onClick={() => checkOutFile(file.id)}>
          Check Out
        </button>
      )}
    </div>
  );
}

export default CADFileCard;