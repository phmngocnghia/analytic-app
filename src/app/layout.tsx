"use client"

import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ErrorBoundary } from '@/app/components/ErrorBoundary'

const ROUTES: ItemType<MenuItemType>[] = [
  {
    label: <Link href="/">Home</Link>,
    type: 'group',
    key: '/'
  }, {
    label: <Link href="/map">Map</Link>,
    type: 'group',
    key: '/map'
  }
]


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ErrorBoundary >
          <Layout className='p-7 min-h-screen'>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={ROUTES}
              className="mb-5"
            />

            <Content>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </Content>

          </Layout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
