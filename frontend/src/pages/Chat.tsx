import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationsList from '../components/chat/ConversationsList';
import ChatWindow from '../components/chat/ChatWindow';
import AddUserModal from '../components/chat/AddUserModal';
import type { Conversation } from '../types/chat';

const Chat = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // TODO: Fetch conversations from API
        const mockConversations: Conversation[] = [
            {
                id: 1,
                userId: 2,
                username: 'johndoe',
                firstName: 'John',
                lastName: 'Doe',
                lastMessage: 'Hey! How are you?',
                lastMessageTime: '2 mins ago',
                unreadCount: 2,
                online: true,
            },
            {
                id: 2,
                userId: 3,
                username: 'janedoe',
                firstName: 'Jane',
                lastName: 'Doe',
                lastMessage: 'See you tomorrow!',
                lastMessageTime: '1 hour ago',
                unreadCount: 0,
                online: false,
            },
        ];
        setConversations(mockConversations);
    }, []);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="h-screen flex bg-[--color-club-darker]">
            {/* Conversations Sidebar */}
            <motion.div
                className={`
          ${isMobileMenuOpen ? 'absolute inset-0 z-50' : 'hidden'}
          lg:relative lg:flex lg:w-96 
          flex-col bg-[--color-club-dark] border-r border-[--color-club-gray-light]/20
        `}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <ConversationsList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={handleSelectConversation}
                    onAddUser={() => setShowAddUser(true)}
                    onCloseMobile={() => setIsMobileMenuOpen(false)}
                />
            </motion.div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <ChatWindow
                        conversation={selectedConversation}
                        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                    />
                ) : (
                    <EmptyState onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
                )}
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {showAddUser && (
                    <AddUserModal
                        onClose={() => setShowAddUser(false)}
                        onUserAdded={() => {
                            // TODO: Start new conversation
                            setShowAddUser(false);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const EmptyState = ({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) => {
    return (
        <div className="flex-1 flex items-center justify-center bg-[--color-club-darker]">
            {/* Mobile menu button */}
            <button
                onClick={onOpenMobileMenu}
                className="lg:hidden absolute top-4 left-4 p-2 rounded-lg bg-[--color-club-dark] text-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[--color-club-purple]/20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[--color-club-purple]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Select a conversation</h2>
                <p className="text-gray-400">Choose from your existing conversations or start a new one</p>
            </div>
        </div>
    );
};

export default Chat;