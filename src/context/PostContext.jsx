import React from 'react';

import { createContext, useState, useContext } from 'react'
import { postApi } from '../services/api'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchFeed = async () => {
    setLoading(true)
    try {
      const response = await postApi.getFeed()
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      setLoading(false)
    }
  }

  const likePost = async (postId) => {
    try {
      await postApi.likePost(postId)
      // Update local state optimistically
      setPosts(posts.map(post =>
        post._id === postId
          ? { ...post, likesCount: post.likesCount + 1, isLiked: true }
          : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const unlikePost = async (postId) => {
    try {
      await postApi.unlikePost(postId)
      // Update local state optimistically
      setPosts(posts.map(post =>
        post._id === postId
          ? { ...post, likesCount: post.likesCount - 1, isLiked: false }
          : post
      ))
    } catch (error) {
      console.error('Error unliking post:', error)
    }
  }

  return (
    <PostContext.Provider value={{ posts, loading, fetchFeed, likePost, unlikePost }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => useContext(PostContext)



//     <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
//   <Navbar />
  
//   <div className="max-w-xl mx-auto mt-6 px-5">
//     <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold text-blue-900 mb-6">Create New Post</h2>

//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <textarea
//           placeholder="What's on your mind?"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-[120px] focus:outline-none focus:border-blue-500 bg-gray-50"
//           required
//         />

//         {/* Image Upload Section */}
//         <div className="create-upload flex flex-col gap-2">
//           <label className="create-label text-gray-700 font-medium">Add an image (optional)</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="cursor-pointer text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 p-2"
//           />
//         </div>

//         {/* Buttons Section */}
//         <div className="flex gap-3 mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
//           >
//             {loading ? 'Posting...' : 'Post'}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-all"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>