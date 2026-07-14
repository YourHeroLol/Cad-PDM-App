function CADFileCard({ file, onSelectFile, checkOutFile, checkInFile }) {
  return (
    <article className="cad-file-card">
      <h2>{file.name}</h2>

      <p>
        {file.checkedOut
          ? `🔒 Checked out by ${file.checkedOutBy}`
          : "🟢 Available"}
      </p>

      <div className="card-actions">
        <button type="button" onClick={() => onSelectFile(file)}>
          Details
        </button>

        {file.checkedOut ? (
          <button
            className="primary-button"
            type="button"
            onClick={() => checkInFile(file.id)}
          >
            Check In
          </button>
        ) : (
          <button
            className="primary-button"
            type="button"
            onClick={() => checkOutFile(file.id)}
          >
            Check Out
          </button>
        )}
      </div>
    </article>
  );
}

export default CADFileCard;
