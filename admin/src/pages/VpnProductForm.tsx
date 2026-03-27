import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Loader2, GripVertical, Trash2, UploadCloud } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { FileUpload } from "@/components/FileUpload"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const productFormSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }).max(60),
  subdomainSlug: z.string().min(2).max(60).regex(/^[a-z0-9-]+$/, {
    message: "Subdomain can only contain lowercase letters, numbers, and hyphens."
  }),
  shortDescription: z.string().max(160).optional(),
  longDescription: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  playStoreUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  appStoreUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  logoUrl: z.string().optional(),
  deviceMockupUrl: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface Screenshot {
  id: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
}

function SortableItem({ item, onDelete }: { item: Screenshot, onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group border rounded-md p-2 bg-white flex flex-col items-center">
      <div {...attributes} {...listeners} className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-1 rounded">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
      <img src={item.imageUrl} alt={item.altText} className="h-32 object-contain rounded" />
      <span className="text-xs text-muted-foreground mt-2 truncate max-w-full">{item.altText || 'Screenshot'}</span>
    </div>
  );
}

export default function VpnProductForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      subdomainSlug: "",
      shortDescription: "",
      longDescription: "",
      primaryColor: "",
      secondaryColor: "",
      playStoreUrl: "",
      appStoreUrl: "",
      logoUrl: "",
      deviceMockupUrl: "",
    },
  })

  useEffect(() => {
    if (isEditing) {
      fetchProduct()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/vpn-products/${id}`)
      const data = await response.json()
      if (data.success && data.product) {
        form.reset({
          name: data.product.name || "",
          subdomainSlug: data.product.subdomainSlug || "",
          shortDescription: data.product.shortDescription || "",
          longDescription: data.product.longDescription || "",
          primaryColor: data.product.primaryColor || "",
          secondaryColor: data.product.secondaryColor || "",
          playStoreUrl: data.product.playStoreUrl || "",
          appStoreUrl: data.product.appStoreUrl || "",
          logoUrl: data.product.logoUrl || "",
          deviceMockupUrl: data.product.deviceMockupUrl || "",
        })
        if (data.product.screenshots) {
          setScreenshots(data.product.screenshots)
        }
      }
    } catch (error) {
      console.error('Error fetching VPN product:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProductFormValues) => {
    setSaving(true)
    try {
      const url = isEditing
        ? `/api/admin/vpn-products/${id}`
        : `/api/admin/vpn-products`

      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user-id': 'admin',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        if (!isEditing) {
          navigate(`/vpn-products/${result.product.id}`)
        } else {
          // Success toast could go here
        }
      } else {
        console.error('Failed to save:', result.error)
        if (result.error === 'Subdomain slug already exists') {
          form.setError('subdomainSlug', { message: 'This subdomain is already in use.' })
        }
      }
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    setUploadingScreenshot(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `vpn-products/${id}/screenshots`);

    try {
      // 1. Upload to S3
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) throw new Error(uploadData.error);

      // 2. Save to DB
      const dbRes = await fetch(`/api/admin/vpn-products/${id}/screenshots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: uploadData.url,
          altText: file.name,
          displayOrder: screenshots.length,
        }),
      });
      const dbData = await dbRes.json();
      if (dbData.success) {
        setScreenshots([...screenshots, dbData.screenshot]);
      }
    } catch (error) {
      console.error('Screenshot upload error:', error);
      alert('Failed to upload screenshot');
    } finally {
      setUploadingScreenshot(false);
      // reset file input
      e.target.value = '';
    }
  }

  const handleDeleteScreenshot = async (sid: string) => {
    if (!id || !confirm('Delete this screenshot?')) return;
    try {
      const res = await fetch(`/api/admin/vpn-products/${id}/screenshots/${sid}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setScreenshots(screenshots.filter(s => s.id !== sid));
      }
    } catch (error) {
      console.error('Error deleting screenshot:', error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = screenshots.findIndex(s => s.id === active.id);
      const newIndex = screenshots.findIndex(s => s.id === over.id);

      const newOrder = arrayMove(screenshots, oldIndex, newIndex);
      setScreenshots(newOrder);

      // Persist order to DB
      if (id) {
        try {
          await fetch(`/api/admin/vpn-products/${id}/screenshots/reorder`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order: newOrder.map((s, index) => ({ id: s.id, displayOrder: index }))
            }),
          });
        } catch (error) {
          console.error('Error reordering screenshots:', error);
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/vpn-products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {isEditing ? 'Edit VPN Product' : 'Create VPN Product'}
          </h2>
          <p className="text-muted-foreground">
            {isEditing ? 'Update the product details and configuration.' : 'Add a new VPN application to your portfolio.'}
          </p>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 flex-wrap">
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="app-store">App Store Links</TabsTrigger>
              <TabsTrigger value="branding">Theme & Branding</TabsTrigger>
              <TabsTrigger value="features" disabled={!isEditing}>Features</TabsTrigger>
              <TabsTrigger value="pricing" disabled={!isEditing}>Pricing Plans</TabsTrigger>
              <TabsTrigger value="media" disabled={!isEditing}>Media & Screenshots</TabsTrigger>
              <TabsTrigger value="legal" disabled={!isEditing}>Legal Content</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="general" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      The core details of this VPN product.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. ShieldVPN" {...field} />
                            </FormControl>
                            <FormDescription>
                              The display name of the VPN application.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subdomainSlug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subdomain Slug</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input placeholder="shieldvpn" {...field} className="rounded-r-none" />
                                <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-sm text-muted-foreground">
                                  .abcd.com
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              The URL where this product will be hosted.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Secure, fast, and reliable VPN." {...field} />
                          </FormControl>
                          <FormDescription>
                            A brief tagline or summary (max 160 characters).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter detailed information about the VPN product..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="app-store" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Links</CardTitle>
                    <CardDescription>
                      Links to the respective app stores.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="playStoreUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Play Store URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://play.google.com/store/apps/details?id=..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appStoreUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apple App Store URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://apps.apple.com/app/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="branding" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme & Branding</CardTitle>
                    <CardDescription>
                      Customize the visual appearance for this product's landing page.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="primaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Color</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input type="color" className="w-12 p-1" {...field} />
                                <Input placeholder="#000000" {...field} className="flex-1" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="secondaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Color</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input type="color" className="w-12 p-1" {...field} />
                                <Input placeholder="#000000" {...field} className="flex-1" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>
                      Manage the list of features shown on the landing page.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-8 border rounded-md border-dashed">
                      <p className="text-muted-foreground mb-4">Feature management will be implemented in the next iteration.</p>
                      <Button variant="outline" type="button" disabled>Add Feature</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Plans</CardTitle>
                    <CardDescription>
                      Configure subscription tiers for this product.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-8 border rounded-md border-dashed">
                      <p className="text-muted-foreground mb-4">Pricing plan management will be implemented in the next iteration.</p>
                      <Button variant="outline" type="button" disabled>Add Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Media & Screenshots</CardTitle>
                    <CardDescription>
                      Upload app logos, mockups, and screenshots.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {!isEditing ? (
                      <div className="text-center p-8 border rounded-md border-dashed bg-muted/20">
                        <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Save product first</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                          Please save the general information for this new product before uploading media files and screenshots.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="logoUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <FileUpload
                                    label="App Logo"
                                    value={field.value}
                                    onChange={field.onChange}
                                    folder={`vpn-products/${id}/media`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="deviceMockupUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <FileUpload
                                    label="Device Mockup"
                                    value={field.value}
                                    onChange={field.onChange}
                                    folder={`vpn-products/${id}/media`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium">App Screenshots</h3>
                              <p className="text-sm text-muted-foreground">Drag to reorder. Maximum 8 screenshots.</p>
                            </div>
                            <div>
                              <div className="relative inline-block overflow-hidden">
                                <Button type="button" variant="secondary" disabled={uploadingScreenshot || screenshots.length >= 8}>
                                  {uploadingScreenshot ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                                  Add Screenshot
                                </Button>
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                                  onChange={handleScreenshotUpload}
                                  disabled={uploadingScreenshot || screenshots.length >= 8}
                                />
                              </div>
                            </div>
                          </div>

                          {screenshots.length > 0 ? (
                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={handleDragEnd}
                            >
                              <SortableContext
                                items={screenshots.map(s => s.id)}
                                strategy={rectSortingStrategy}
                              >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md bg-muted/20">
                                  {screenshots.map(screenshot => (
                                    <SortableItem key={screenshot.id} item={screenshot} onDelete={handleDeleteScreenshot} />
                                  ))}
                                </div>
                              </SortableContext>
                            </DndContext>
                          ) : (
                            <div className="text-center p-8 border rounded-md border-dashed">
                              <p className="text-muted-foreground">No screenshots added yet.</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="legal" className="m-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Legal Content</CardTitle>
                    <CardDescription>
                      Privacy Policy and Terms of Service documents.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-8 border rounded-md border-dashed">
                      <p className="text-muted-foreground mb-4">Legal document management will be implemented in the next iteration.</p>
                      <Button variant="outline" type="button" disabled>Edit Legal Content</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
