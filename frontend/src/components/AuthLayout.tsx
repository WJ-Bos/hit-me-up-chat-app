import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import authImage from '../assets/images/background.jpg';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            {/* Left Side - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-6 xl:p-8 relative overflow-hidden">
                {/* Animated background gradient (subtle) */}
                <motion.div
                    className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-[100px]"
                    style={{ backgroundColor: 'rgb(124 58 237 / 0.15)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Logo/Brand */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-bold mb-2" style={{
                            background: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-tertiary) 50%, var(--color-gold) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            HitMeUp
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
                            Where conversations come alive
                        </p>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                        className="glass-effect rounded-2xl p-8 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                {title}
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Side - Image with Fade Effect */}
            <motion.div
                className="hidden lg:block w-[55%] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                {/* Background Image with lower opacity */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: `url('${authImage}')`,
                    }}
                />

                {/* Gradient Overlay - enhances contrast */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to right, var(--color-bg-primary) 0%, rgb(13 13 15 / 0.7) 20%, rgb(13 13 15 / 0.3) 50%, transparent 100%)'
                    }}
                />

                {/* Subtle purple accent gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgb(124 58 237 / 0.2) 0%, transparent 50%)',
                    }}
                />

                {/* Animated purple glow */}
                <motion.div
                    className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-[120px]"
                    style={{ backgroundColor: 'rgb(124 58 237 / 0.3)' }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Text overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-xl">
                    <motion.h3
                        className="text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        Connect with anyone, anywhere
                    </motion.h3>
                    <motion.p
                        style={{ color: 'var(--color-text-secondary)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        Join thousands of users having meaningful conversations every day
                    </motion.p>
                </div>
            </motion.div>

        </div>
    );
};

export default AuthLayout;
