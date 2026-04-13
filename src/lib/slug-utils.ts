export const RESERVED_SLUGS = ['www', 'admin', 'api', 'app', 'cdn', 'test', 'dev', 'staging', 'mail', 'smtp', 'pop', 'imap', 'ns1', 'ns2', 'metrics', 'grafana', 'prometheus', 'auth', 'login', 'dashboard']

export function validateSubdomainSlug(slug: string): string | null {
  if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
    return 'This subdomain slug is reserved and cannot be used.'
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
     return 'Subdomain slug can only contain lowercase letters, numbers, and hyphens.'
  }

  return null // null means validation passed
}
