
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  File,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      title: "Invoices",
      path: "/invoices",
      icon: File,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <ShadcnSidebar className="border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <File className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-sidebar-foreground">InvoicePro</span>
          </Link>
        </div>
        
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center w-full p-3 rounded-md",
                          currentPath === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                        {currentPath === item.path && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <div className="p-4 border-t border-sidebar-border">
          <button className="flex items-center w-full p-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </ShadcnSidebar>
  );
}

export default Sidebar;
