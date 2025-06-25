import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { postApi } from '../services/api';

function CreatePostPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadResponse = await postApi.uploadFile(file);
        setSelectedFile(uploadResponse.data.data.file_url);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await postApi.createPost({ text, image: selectedFile });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Navbar />
      <div className="max-w-lg mx-auto mt-12 px-6 bg-white rounded-xl shadow-2xl p-10 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create New Post</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[120px] focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />

          <div className="flex flex-col items-center">
            <label className="text-gray-700 font-medium mb-2">Add an image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-2 cursor-pointer shadow-md bg-gray-50 hover:bg-gray-100 transition"
            />
          </div>

          {selectedFile && (
            <div className="mt-4">
              <img src={selectedFile} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;