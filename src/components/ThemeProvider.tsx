import React from 'react';

type ThemeProviderProps = {
  primaryColor?: string;
  secondaryColor?: string;
  primaryLightColor?: string;
  primaryDarkColor?: string;
  fontFamily?: string;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  primaryColor,
  secondaryColor,
  primaryLightColor,
  primaryDarkColor,
  fontFamily,
  children,
}) => {
  const style = {
    '--primary': primaryColor,
    '--secondary': secondaryColor,
    '--primary-light': primaryLightColor,
    '--primary-dark': primaryDarkColor,
    ...(fontFamily ? { '--font-sans': fontFamily } : {}),
  } as React.CSSProperties;

  return (
    <div style={style} className="w-full h-full min-h-screen">
      {children}
    </div>
  );
};
