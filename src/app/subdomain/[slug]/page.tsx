export default function SubdomainPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Subdomain Page for: {params.slug}</h1>
    </div>
  )
}
