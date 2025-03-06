
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  CreditCard,
  TrendingUp,
  Wallet,
  Users,
  AlertCircle,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, label, path, isActive }: NavItemProps) => (
  <Link to={path} className="w-full">
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`w-full justify-start gap-3 mb-1 ${
        isActive ? "bg-primary" : ""
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: Home, label: "דשבורד", path: "/" },
    { icon: TrendingUp, label: "הכנסות", path: "/income" },
    { icon: CreditCard, label: "הוצאות", path: "/expenses" },
    { icon: Wallet, label: "מקדמות", path: "/advances" },
    { icon: Users, label: "משכורות עובדי שטח", path: "/field-worker-salaries" },
    { icon: AlertCircle, label: "לקוחות בחוב", path: "/outstanding-customers" },
  ];

  return (
    <>
      {/* Mobile toggle button, visible only on small screens */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 md:hidden"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Sidebar overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-full bg-background border-l transition-all duration-300 shadow-md ${
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } ${isMobile ? "w-[260px]" : "w-[260px]"}`}
      >
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">ניהול פיננסי VIP</h2>
            <p className="text-muted-foreground text-sm">Clean Holdings</p>
          </div>
          
          <Separator />
          
          {/* User profile */}
          <div className="flex items-center gap-3 p-4">
            <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <div className="px-4 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </ScrollArea>
          
          {/* Logout */}
          <div className="p-4 mt-auto">
            <Separator className="mb-4" />
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3" 
              onClick={logout}
            >
              <LogOut size={18} />
              <span>התנתק</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
