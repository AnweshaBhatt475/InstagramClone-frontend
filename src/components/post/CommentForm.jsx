import React,{ useState } from 'react'
import { commentApi } from '../../services/api'

function CommentForm({ postId, onCommentAdded }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) return

    setLoading(true)

     try {
      const response = await commentApi.createComment(postId, { text })
      const newComment = response.data.data
      onCommentAdded && onCommentAdded(newComment)
      setText('')
    }
    catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-2 py-1 text-sm focus:outline-none"
        disabled={loading}
      />
      {text.trim() && (
        <button
          type="submit"
          className="text-blue-500 text-sm font-semibold disabled:text-blue-300"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      )}
    </form>
  )
}

export default CommentForm