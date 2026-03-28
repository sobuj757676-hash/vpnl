import { useEffect, useState } from "react"
import { Download, Users, MousePointerClick, Globe, Server } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function Analytics() {
  const [summary, setSummary] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const summaryRes = await fetch("/api/admin/analytics/summary")
        const summaryData = await summaryRes.json()
        if (summaryData.success) {
          setSummary(summaryData.data)
        }

        const eventsRes = await fetch("/api/admin/analytics/events?limit=10")
        const eventsData = await eventsRes.json()
        if (eventsData.success) {
          setEvents(eventsData.data)
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const handleExport = () => {
    window.location.href = "/api/admin/analytics/export"
  }

  if (loading) {
    return <div className="p-8">Loading analytics...</div>
  }

  return (
    <div className="space-y-6 p-1 pb-16 block">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor your VPN portfolio performance and user behavior.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Main Site Views
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.mainSiteViews || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total page views on root site
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subdomain Views
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.subdomainViews || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total visits across all VPNs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">App Store Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.appStoreClicks || 0}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.activeProducts || 0}</div>
            <p className="text-xs text-muted-foreground">
              Published VPNs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Traffic Trend</CardTitle>
            <CardDescription>
              Page views trend across properties (mock).
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Mon", views: 4000 },
                  { name: "Tue", views: 3000 },
                  { name: "Wed", views: 2000 },
                  { name: "Thu", views: 2780 },
                  { name: "Fri", views: 1890 },
                  { name: "Sat", views: 2390 },
                  { name: "Sun", views: 3490 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="views" fill="currentColor" className="fill-primary" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Traffic Share</CardTitle>
            <CardDescription>
              Distribution by property.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Main Site', value: summary?.mainSiteViews || 400 },
                    { name: 'Subdomains', value: summary?.subdomainViews || 300 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1].map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 w-full text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[0] }} />
                <span>Main Site</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[1] }} />
                <span>Subdomains</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Latest analytics events tracked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="text-sm text-muted-foreground py-4 text-center border rounded-md border-dashed">No recent events recorded</div>
              ) : (
                events.map((event, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none capitalize">{event.eventType?.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {event.pageUrl || 'No URL'}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Event Log</CardTitle>
          <CardDescription>
            Recent tracked interactions across all properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium capitalize">{event.eventType?.replace(/_/g, ' ')}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={event.pageUrl}>{event.pageUrl || '-'}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={event.referrer}>{event.referrer || '-'}</TableCell>
                    <TableCell>{event.countryCode || '-'}</TableCell>
                    <TableCell className="text-right">{new Date(event.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
