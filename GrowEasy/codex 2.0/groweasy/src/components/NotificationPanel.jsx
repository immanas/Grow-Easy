import React from "react";

const notifications = [
  { message: "Stock for 'Wireless Mouse' is running low", type: "warning" },
  { message: "New order received for 5 T-shirts", type: "success" },
  { message: "Price updated for 'Bluetooth Speaker'", type: "info" },
];

function NotificationPanel() {
  const getColor = (type) => {
    switch (type) {
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "success": return "bg-green-100 text-green-800";
      case "info": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold mb-4">Notifications</h3>
      <div className="space-y-2">
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${getColor(note.type)} text-sm`}
          >
            {note.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;
