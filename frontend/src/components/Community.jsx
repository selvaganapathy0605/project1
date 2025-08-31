import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "", tags: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/community`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load community posts. Please login again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/community`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: "", body: "", tags: "" });
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/community/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans mt-[114px] bg-gray-200 rounded-2xl shadow-lg relative">
      <h2 className="text-2xl font-bold mb-6 text-center">🌍 Community Forum</h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="border border-gray-200 bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col justify-between"
              key={post._id}
            >
              <div>
                <h4 className="text-lg font-semibold text-blue-600">
                  {post.author?.name || "Anonymous"}
                </h4>
                <h5 className="text-md font-bold mt-2">{post.title}</h5>
                <p className="text-gray-800 mt-1">{post.body}</p>
                {post.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <small className="text-gray-500 text-sm block mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>

              
              <button
                onClick={() => handleLike(post._id)}
                className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition w-full"
              >
                ❤️ {post.likes?.length || 0} Likes
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            No posts yet. Be the first 🚀
          </p>
        )}
      </div>

      
      <button
        onClick={() => setShowForm(true)}
        className="fixed top-30 right-6 bg-blue-600 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        ➕
      </button>

      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">✍️ Create a Blog</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Write your blog..."
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Post 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
