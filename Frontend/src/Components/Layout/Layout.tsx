import React, { ReactNode } from 'react';
import Chatbot from '../Chatbot/Chatbot';
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Chatbot />
            {children}
        </div>
    );
};

export default Layout;