import { useState } from 'react';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { Conversation } from '../../types/chat';

interface ConversationsListProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelectConversation: (conversation: Conversation) => void;
    onAddUser: () => void;
    onCloseMobile?: () => void;
}

const ConversationsList = ({
                               conversations,
                               selectedConversation,
                               onSelectConversation,
                               onAddUser,
                               onCloseMobile,
                           }: ConversationsListProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations.filter(conv =>
        conv.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-[--color-club-gray-light]/20">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold gradient-text">
                        Messages
                    </h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onAddUser}
                            className="p-2 rounded-lg bg-[--color-club-purple] hover:bg-[--color-club-purple-dark] transition-colors"
                        >
                            <FiPlus className="w-5 h-5 text-white" />
                        </button>
                        {onCloseMobile && (
                            <button
                                onClick={onCloseMobile}
                                className="lg:hidden p-2 rounded-lg bg-[--color-club-gray] hover:bg-[--color-club-gray-light] transition-colors"
                            >
                                <FiX className="w-5 h-5 text-white" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 bg-[--color-club-darker] border border-[--color-club-gray-light]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[--color-club-purple] transition-colors"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <p className="text-gray-400 mb-4">No conversations found</p>
                        <button
                            onClick={onAddUser}
                            className="px-4 py-2 bg-[--color-club-purple] hover:bg-[--color-club-purple-dark] rounded-lg text-white transition-colors"
                        >
                            Start a conversation
                        </button>
                    </div>
                ) : (
                    filteredConversations.map((conversation) => (
                        <motion.div
                            key={conversation.id}
                            onClick={() => onSelectConversation(conversation)}
                            className={`
                p-4 border-b border-[--color-club-gray-light]/10 cursor-pointer transition-all
                ${selectedConversation?.id === conversation.id
                                ? 'bg-[--color-club-purple]/20 border-l-4 border-l-[--color-club-purple]'
                                : 'hover:bg-[--color-club-gray]/50'
                            }
              `}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--color-club-purple] to-[--color-club-gold] flex items-center justify-center text-white font-bold">
                                        {getInitials(conversation.firstName, conversation.lastName)}
                                    </div>
                                    {conversation.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[--color-club-dark]"></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-white truncate">
                                            {conversation.firstName && conversation.lastName
                                                ? `${conversation.firstName} ${conversation.lastName}`
                                                : conversation.username
                                            }
                                        </h3>
                                        <span className="text-xs text-gray-400">
                      {conversation.lastMessageTime}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400 truncate">
                                            {conversation.lastMessage || 'No messages yet'}
                                        </p>
                                        {conversation.unreadCount > 0 && (
                                            <span className="ml-2 px-2 py-0.5 bg-[--color-club-purple] text-white text-xs rounded-full">
                        {conversation.unreadCount}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConversationsList;