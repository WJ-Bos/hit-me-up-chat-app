import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMenu, FiMoreVertical } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { Conversation, Message } from '../../types/chat';

interface ChatWindowProps {
    conversation: Conversation;
    onOpenMobileMenu: () => void;
}

const ChatWindow = ({ conversation, onOpenMobileMenu }: ChatWindowProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

    // Mock messages
    useEffect(() => {
        const mockMessages: Message[] = [
            {
                id: 1,
                content: 'Hey! How are you doing?',
                senderId: conversation.userId,
                recipientId: currentUserId,
                timestamp: '10:30 AM',
                read: true,
            },
            {
                id: 2,
                content: 'I\'m doing great! Thanks for asking 😊',
                senderId: currentUserId,
                recipientId: conversation.userId,
                timestamp: '10:32 AM',
                read: true,
            },
            {
                id: 3,
                content: 'Want to grab coffee later? I found this amazing new place downtown!',
                senderId: conversation.userId,
                recipientId: currentUserId,
                timestamp: '10:35 AM',
                read: true,
            },
            {
                id: 4,
                content: 'Sounds perfect! What time works for you?',
                senderId: currentUserId,
                recipientId: conversation.userId,
                timestamp: '10:36 AM',
                read: true,
            },
        ];
        setMessages(mockMessages);
    }, [conversation, currentUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            content: message,
            senderId: currentUserId,
            recipientId: conversation.userId,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            read: false,
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div
                className="flex items-center justify-between p-4 border-b"
                style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="flex items-center gap-3">
                    <button
                        onClick={onOpenMobileMenu}
                        className="lg:hidden p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                    >
                        <FiMenu className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
                    </button>

                    <div className="relative">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))'
                            }}
                        >
                            {getInitials(conversation.firstName, conversation.lastName)}
                        </div>
                        {conversation.online && (
                            <div
                                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2"
                                style={{ borderColor: 'var(--color-bg-secondary)' }}
                            />
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            {conversation.firstName && conversation.lastName
                                ? `${conversation.firstName} ${conversation.lastName}`
                                : conversation.username
                            }
                        </h2>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            {conversation.online ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>

                <button
                    className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                    <FiMoreVertical className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
                </button>
            </div>

            {/* Messages Area */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ backgroundColor: 'var(--color-bg-primary)' }}
            >
                {messages.map((msg, index) => {
                    const isOwnMessage = msg.senderId === currentUserId;
                    const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId;
                    const isConsecutive = index > 0 && messages[index - 1].senderId === msg.senderId;

                    return (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex items-end gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} ${isConsecutive ? 'mt-1' : 'mt-4'}`}
                        >
                            {/* Avatar */}
                            {showAvatar && !isOwnMessage ? (
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))'
                                    }}
                                >
                                    {getInitials(conversation.firstName, conversation.lastName)}
                                </div>
                            ) : !isOwnMessage ? (
                                <div className="w-8" />
                            ) : null}

                            {/* Message Bubble */}
                            <div className={`message-bubble ${isOwnMessage ? 'message-bubble-sent' : 'message-bubble-received'}`}>
                                <p className="break-words">{msg.content}</p>
                                <div className="message-time" style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>
                                    {msg.timestamp}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div
                className="p-4 border-t"
                style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-full border transition-all focus:outline-none"
                        style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)'
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: message.trim()
                                ? 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))'
                                : 'var(--color-bg-tertiary)',
                            boxShadow: message.trim() ? 'var(--shadow-glow)' : 'none'
                        }}
                    >
                        <FiSend className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;