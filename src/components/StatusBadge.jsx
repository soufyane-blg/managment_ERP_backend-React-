function StatusBadge({ status }) {
    let color = "";
  
    if (status === "pending") {
      color = "orange";
    } else if (status === "completed") {
      color = "green";
    } else if (status === "cancelled") {
      color = "red";
    }
  
    return (
      <span
        style={{
          backgroundColor: color,
          color: "white",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
        }}
      >
        {status}
      </span>
    );
  }
  
  export default StatusBadge;