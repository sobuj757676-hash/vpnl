import { Server, Users } from "lucide-react"

export default function Dashboard() {
  return (
    <>
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
    </>
  )
}
