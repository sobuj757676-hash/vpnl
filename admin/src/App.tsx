import { Routes, Route, Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { AppProvider } from "./providers"
import { Shield, Home, Settings, Users, Server, FileText, BarChart3, Lock } from "lucide-react"

import Dashboard from "./pages/Dashboard"
import VpnProducts from "./pages/VpnProducts"

export default function App() {
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard"
      case "/vpn-products": return "VPN Products"
      default: return "Admin"
    }
  }

  return (
    <AppProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b px-4 py-3">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span>VPN Portfolio Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2 py-4 gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="VPN Products" isActive={location.pathname === "/vpn-products"}>
                  <Link to="/vpn-products">
                    <Server className="mr-2 h-4 w-4" />
                    <span>VPN Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Subscribers">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Subscribers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Audit Logs">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Audit Logs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Super Admin</span>
                <span className="text-xs text-muted-foreground">admin@abcd.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vpn-products" element={<VpnProducts />} />
            </Routes>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppProvider>
  )
}
