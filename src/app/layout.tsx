import type { Metadata } from 'next';
import React from 'react';
import './globals.scss';

import AuthProvider from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'VM Mart | High-Quality Vending Machines for All Needs | Reliable & Efficient Solutions',
  description: `VM Mart offers high-quality, customizable vending machines for offices, schools, gyms, and more. Our machines feature snacks, beverages, and essentials with cashless payment options and easy maintenance. Boost convenience and customer satisfaction with VM Mart's reliable vending solutions`,
  keywords: `VM Mart, vending machines, snack vending, beverage vending, cashless vending machines, custom vending,
    office vending machines, reliable vending services, automated vending solutions.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
