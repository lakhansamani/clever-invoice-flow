
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile} defaultWidth={280}>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
