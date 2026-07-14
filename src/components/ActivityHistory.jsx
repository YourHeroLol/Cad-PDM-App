function ActivityHistory({ activities }) {
  return (
    <section className="activity-section" aria-labelledby="activity-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Audit trail</p>
          <h2 id="activity-heading">Activity History</h2>
        </div>
        <span className="activity-count">{activities.length} events</span>
      </div>

      {activities.length === 0 ? (
        <p className="empty-state">No vault activity has been recorded yet.</p>
      ) : (
        <ol className="activity-list">
          {activities.map((activity) => (
            <li className="activity-item" key={activity.id}>
              <span
                className={`activity-icon activity-icon--${activity.action}`}
                aria-hidden="true"
              >
                {activity.action === "checked-in" ? "✓" : "↗"}
              </span>

              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong>{" "}
                  {activity.action === "checked-in"
                    ? "checked in"
                    : "checked out"}{" "}
                  <strong>{activity.fileName}</strong>
                </p>
                <p className="activity-meta">
                  Version {activity.version} · {activity.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default ActivityHistory;
