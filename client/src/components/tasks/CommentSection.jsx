import { useState } from 'react';
import { useApp } from '../../context/ProjectContext';
import { Button } from '../common/Button';

export const CommentSection = ({ task }) => {
    const { addComment, getUserName, users } = useApp();
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSubmitting(true);
        try {
            await addComment(task._id, commentText);
            setCommentText('');
        } catch (err) {
            console.error('Failed to add comment', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">
                Comments ({task.comments?.length || 0})
            </h4>

            {/* Comment List */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {task.comments && task.comments.length > 0 ? (
                    task.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                    {users.length > 0 ? getUserName(comment.userId) : comment.userId}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatDate(comment.createdAt)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 italic">No comments yet</p>
                )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    disabled={isSubmitting}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        size="sm"
                        disabled={!commentText.trim() || isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Comment'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
