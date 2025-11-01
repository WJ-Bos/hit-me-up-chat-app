import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSearch, FiUserPlus } from 'react-icons/fi';
import type { ChatUser } from '../../types/chat';

interface AddUserModalProps {
    onClose: () => void;
    onUserAdded: (userId: number) => void;
}

const AddUserModal = ({ onClose, onUserAdded }: AddUserModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            // TODO: Replace with actual API endpoint
            // const response = await api.get(`/users/search?q=${searchQuery}`);
            // setSearchResults(response.data);

            // Mock data for now
            const mockResults: ChatUser[] = [
                {
                    id: 4,
                    username: 'alice',
                    email: 'alice@example.com',
                    firstName: 'Alice',
                    lastName: 'Smith',
                    online: true,
                },
                {
                    id: 5,
                    username: 'bob',
                    email: 'bob@example.com',
                    firstName: 'Bob',
                    lastName: 'Johnson',
                    online: false,
                },
            ];
            setSearchResults(mockResults);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = (userId: number) => {
        onUserAdded(userId);
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-[--color-club-dark] rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[--color-club-gray-light]/20">
                    <h2 className="text-xl font-bold text-white">Start New Conversation</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[--color-club-gray] transition-colors"
                    >
                        <FiX className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Search by username or email..."
                                className="w-full pl-10 pr-4 py-3 bg-[--color-club-darker] border border-[--color-club-gray-light]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[--color-club-purple] transition-colors"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading || !searchQuery.trim()}
                            className="px-4 py-3 bg-[--color-club-purple] hover:bg-[--color-club-purple-dark] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-[--color-club-purple] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            {searchQuery ? 'No users found' : 'Search for users to start a conversation'}
                        </div>
                    ) : (
                        <div className="divide-y divide-[--color-club-gray-light]/10">
                            {searchResults.map((user) => (
                                <div
                                    key={user.id}
                                    className="p-4 hover:bg-[--color-club-gray]/30 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--color-club-purple] to-[--color-club-gold] flex items-center justify-center text-white font-bold">
                                                {getInitials(user.firstName, user.lastName)}
                                            </div>
                                            {user.online && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[--color-club-dark]"></div>
                                            )}
                                        </div>

                                        {/* User Info */}
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {user.firstName && user.lastName
                                                    ? `${user.firstName} ${user.lastName}`
                                                    : user.username
                                                }
                                            </h3>
                                            <p className="text-sm text-gray-400">@{user.username}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddUser(user.id)}
                                        className="p-2 bg-[--color-club-purple] hover:bg-[--color-club-purple-dark] rounded-lg transition-colors"
                                    >
                                        <FiUserPlus className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddUserModal;