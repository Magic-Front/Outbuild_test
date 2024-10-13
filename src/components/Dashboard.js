import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/'); 
      alert('You must login.')
    }
  }, [navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, []);

  const openModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-lg py-4 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold mx-auto">ProDashboard</h1>
        <button className="text-blue-500" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="mt-8 w-full max-w-6xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="max-h-[800px] overflow-y-auto p-4"> {/* Scrollable container */}
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => openModal(comment)} className="text-blue-500">
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 relative w-96 h-96">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              Close
            </button>
            <p><strong>ID:</strong> {selectedComment.id}</p>
            <p><strong>Name:</strong> {selectedComment.name}</p>
            <p><strong>Email:</strong> {selectedComment.email}</p>
            <p><strong>Body:</strong> {selectedComment.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;