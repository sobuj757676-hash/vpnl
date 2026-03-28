import { Metadata } from 'next';
import { MainHero } from '@/components/MainHero';
import { VpnProductCatalog } from '@/components/VpnProductCatalog';
import { StatsBar } from '@/components/StatsBar';
import { AboutUs } from '@/components/AboutUs';
import { GlobalFooter } from '@/components/GlobalFooter';
import { Header } from '@/components/Header';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { getSiteConfig } from '@/lib/data/site-config';
import prisma from '@/lib/prisma';
import { VpnProduct } from '@prisma/client';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: siteConfig['meta_title'] || 'VPN Portfolio Ecosystem',
    description: siteConfig['meta_description'] || 'Discover the best VPN products tailored to your needs.',
    openGraph: {
      title: siteConfig['meta_title'] || 'VPN Portfolio Ecosystem',
      description: siteConfig['meta_description'] || 'Discover the best VPN products tailored to your needs.',
      url: process.env.NEXT_PUBLIC_MAIN_DOMAIN ? `https://${process.env.NEXT_PUBLIC_MAIN_DOMAIN}` : 'https://abcd.com',
      siteName: 'VPN Portfolio',
      images: siteConfig['og_image'] ? [
        {
          url: siteConfig['og_image'],
          width: 1200,
          height: 630,
        },
      ] : [],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: siteConfig['canonical_url'] || (process.env.NEXT_PUBLIC_MAIN_DOMAIN ? `https://${process.env.NEXT_PUBLIC_MAIN_DOMAIN}` : 'https://abcd.com'),
    },
  };
}

export default async function Home() {
  const siteConfig = await getSiteConfig();

  let products: VpnProduct[] = [];
  try {
    products = await prisma.vpnProduct.findMany({
      where: { status: 'published' },
      orderBy: { displayOrder: 'asc' },
    });
  } catch (error) {
    console.warn('Could not fetch VPN products during static build:', error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-black dark:bg-black dark:text-white">
      <AnnouncementBar
        visible={siteConfig['announcement_visible'] !== false}
        text={siteConfig['announcement_text']}
        bgColor={siteConfig['announcement_bg_color']}
        url={siteConfig['announcement_url']}
      />
      <Header />
      <main className="flex-1 w-full pt-0">
        <MainHero
          headline={siteConfig['hero_headline']}
          subHeadline={siteConfig['hero_sub_headline']}
          ctaLabel={siteConfig['hero_cta_label']}
          ctaUrl={siteConfig['hero_cta_url']}
          bgStyle={siteConfig['hero_bg_style']}
          bgValue={siteConfig['hero_bg_value']}
        />
        <VpnProductCatalog products={products} />

        <div id="stats">
          <StatsBar
            stats={[
              { number: siteConfig['stats_1_number'] || '50M+', label: siteConfig['stats_1_label'] || 'Downloads' },
              { number: siteConfig['stats_2_number'] || '10+', label: siteConfig['stats_2_label'] || 'VPN Products' },
              { number: siteConfig['stats_3_number'] || '150+', label: siteConfig['stats_3_label'] || 'Countries' },
            ]}
          />
        </div>

        <div id="about">
          <AboutUs
            heading={siteConfig['about_heading']}
            content={siteConfig['about_content']}
            imageUrl={siteConfig['about_image_url']}
            visible={siteConfig['about_visible'] !== false}
          />
        </div>
      </main>

      <GlobalFooter
        contactEmail={siteConfig['footer_contact_email']}
        copyrightText={siteConfig['footer_copyright_text']}
        socialLinks={siteConfig['footer_social_links'] || []}
        navGroups={siteConfig['footer_nav_groups'] || []}
      />
    </div>
  );
}
