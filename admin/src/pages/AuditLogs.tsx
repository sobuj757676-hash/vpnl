import { useEffect, useState } from "react"
import { FileText } from "lucide-react"

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

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/admin/audit-log?limit=50")
        const data = await res.json()
        if (data.success) {
          setLogs(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch audit logs", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  if (loading) {
    return <div className="p-8">Loading audit logs...</div>
  }

  return (
    <div className="space-y-6 p-1 pb-16 block">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">Track all Super Admin actions and system changes.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            System Audit Trail
          </CardTitle>
          <CardDescription>
            A read-only log of all create, update, delete, and publish actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity Type</TableHead>
                  <TableHead>Entity ID</TableHead>
                  <TableHead>Changes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No audit logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${log.actionType === 'create' ? 'bg-green-100 text-green-800' :
                            log.actionType === 'delete' ? 'bg-red-100 text-red-800' :
                            log.actionType === 'update' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {log.actionType}
                        </span>
                      </TableCell>
                      <TableCell className="capitalize">{log.entityType?.replace(/_/g, ' ')}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.entityId || '-'}
                      </TableCell>
                      <TableCell className="text-xs max-w-xs truncate" title={JSON.stringify(log.changes)}>
                        {log.changes ? JSON.stringify(log.changes) : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
