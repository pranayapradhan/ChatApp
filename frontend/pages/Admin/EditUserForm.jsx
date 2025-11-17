import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast"; 

function EditUserForm({ user, onDone }) {
  const [username, setUsername] = useState(user.username);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:9000/api/admin/users/${user._id}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Username updated"); 
      onDone(); 
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update username");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded mt-10">
      <h2 className="text-lg font-semibold mb-2">Edit User</h2>
      <input
        type="text"
        className="border p-2 mr-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-green-500 text-white px-3 py-1 rounded" type="submit">
        Save
      </button>
      <button
        className="bg-white text-black m-1 px-3 py-1 rounded"
        type="button"
        onClick={onDone}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditUserForm;