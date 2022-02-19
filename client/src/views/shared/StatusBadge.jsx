import React from "react";

const StatusBadge = ({ status, whoCancelled }) => {
  let badgeClass = "";
  switch (status) {
    case "active":
      badgeClass = "badge-secondary";
      break;
    case "pending":
      badgeClass = "badge-accent";
      break;
    case "cancelled":
      badgeClass = "badge-primary";
      break;
    default:
      badgeClass = "badge";
  }

  return (
    <p>
      <span className={`badge ${badgeClass} py-3 my-3`}>{status}</span>
      {
        // if request is cancelled, show who cancelled
        whoCancelled && (
          <span
            style={{ color: "#7A1C00" }}
            className="px-1 text-sm font-semibold"
          >
            by {whoCancelled}
          </span>
        )
      }
    </p>
  );
};

export default StatusBadge;
