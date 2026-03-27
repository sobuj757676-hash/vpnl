import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Globe, Server as ServerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function VpnProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/vpn-products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching VPN products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'

    // Optimistic update
    setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p))

    try {
      await fetch(`/api/admin/vpn-products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
    } catch (error) {
      console.error('Error updating status:', error)
      // Revert optimistic update on error
      fetchProducts()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this VPN product? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/vpn-products/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">VPN Products</h2>
          <p className="text-muted-foreground">Manage your portfolio of VPN applications.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <ServerIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No VPN products found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Get started by creating your first VPN product to manage its features, pricing, and content.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Product Name</TableHead>
                <TableHead>Subdomain</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border"
                        style={{
                          backgroundColor: product.primaryColor ? `${product.primaryColor}20` : undefined,
                          borderColor: product.primaryColor ? `${product.primaryColor}40` : undefined
                        }}
                      >
                        {product.logoUrl ? (
                          <img src={product.logoUrl} alt={product.name} className="h-6 w-6 object-contain" />
                        ) : (
                          <ServerIcon className="h-5 w-5" style={{ color: product.primaryColor || 'currentColor' }} />
                        )}
                      </div>
                      <div>
                        <div>{product.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {product.shortDescription || "No description"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Globe className="h-3.5 w-3.5" />
                      {product.subdomainSlug}.abcd.com
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                        {product._count?.features || 0} Features
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                        {product._count?.pricingPlans || 0} Plans
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant={product.status === 'published' ? 'success' : 'secondary'} className="w-20 justify-center capitalize">
                        {product.status}
                      </Badge>
                      <Switch
                        checked={product.status === 'published'}
                        onCheckedChange={() => handleStatusToggle(product.id, product.status)}
                        aria-label="Toggle publish status"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
