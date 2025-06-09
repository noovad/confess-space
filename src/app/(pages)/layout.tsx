import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OnlineUsersSection from "@/components/app-sidebar/components/OnlineUsersSection";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen overflow-hidden w-full flex flex-col">
        <hr />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={50} defaultSize={80}>
            <div>{children}</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel maxSize={25} minSize={5} defaultSize={20}>
            <OnlineUsersSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </SidebarProvider>
  );
}
