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

export default function App() {
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
                <SidebarMenuButton tooltip="Dashboard" isActive>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="VPN Products">
                  <Server className="mr-2 h-4 w-4" />
                  <span>VPN Products</span>
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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium">Total VPN Products</h3>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="text-sm text-muted-foreground">+2 from last month</div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium">Active Subscribers</h3>
                  <p className="text-3xl font-bold mt-2">14,231</p>
                </div>
                <div className="text-sm text-green-500 font-medium">+12% from last month</div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium">Total Revenue</h3>
                  <p className="text-3xl font-bold mt-2">$42,890</p>
                </div>
                <div className="text-sm text-green-500 font-medium">+5% from last month</div>
              </div>
            </div>
            <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Server className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">"ShieldVPN" published</p>
                      <p className="text-sm text-muted-foreground">Admin updated product status</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">New subscription</p>
                      <p className="text-sm text-muted-foreground">User subscribed to "GhostVPN"</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppProvider>
  )
}
