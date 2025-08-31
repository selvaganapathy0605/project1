import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/api";

export default function Notifications({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get(`/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await API.put(
        `/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };
  
  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading notifications...</p>;

  return (
    <div className="p-4 bg-gray-200 shadow-lg rounded-2xl max-w-md mx-auto h-[64vh] mt-[80px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-3 rounded-lg flex justify-between items-center ${
                n.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <div>
                <p className="font-medium">{n.message}</p>
                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
