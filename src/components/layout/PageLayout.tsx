import { ReactNode, Suspense, lazy } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Lazy load ChatButton since it's not critical for initial render
const ChatButton = lazy(() => import("@/components/ai-bot/ChatButton").then(module => ({ default: module.ChatButton })));

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <Suspense fallback={<div />}>
        <ChatButton />
      </Suspense>
    </div>
  );
};

export default PageLayout;
