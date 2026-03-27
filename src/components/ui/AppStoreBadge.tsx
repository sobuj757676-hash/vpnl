import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AppStoreBadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  store: 'apple' | 'google';
  url: string;
}

export const AppStoreBadge: React.FC<AppStoreBadgeProps> = ({ store, url, className, ...props }) => {
  const imgSrc = store === 'apple'
    ? '/badges/apple-store-badge.svg'
    : '/badges/google-play-badge.svg';

  const altText = store === 'apple' ? 'Download on the App Store' : 'Get it on Google Play';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-block transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={imgSrc}
        alt={altText}
        width={140}
        height={46}
        style={{ width: 'auto', height: '46px' }}
      />
    </a>
  );
};
