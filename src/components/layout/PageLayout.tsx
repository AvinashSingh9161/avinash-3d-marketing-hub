
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ChatButton } from "@/components/ai-bot/ChatButton";

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
      <ChatButton />
    </div>
  );
};

export default PageLayout;
