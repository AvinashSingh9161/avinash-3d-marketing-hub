import { User } from "@supabase/supabase-js";
import { LayoutDashboard, FileText, FolderOpen, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminSidebarProps {
  user: User | null;
  activeView: "dashboard" | "blog" | "projects" | "settings";
  onViewChange: (view: "dashboard" | "blog" | "projects" | "settings") => void;
  onLogout: () => void;
}

export const AdminSidebar = ({ user, activeView, onViewChange, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "blog" as const, label: "Blog", icon: FileText },
    { id: "projects" as const, label: "Projects", icon: FolderOpen },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "JD";
  };

  const getUserName = () => {
    return user?.email?.split("@")[0] || "John Doe";
  };

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{getUserName()}</h3>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={onLogout}
          variant="default"
          className="w-full"
          size="sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
