import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Layout className='p-7 min-h-screen'>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={ROUTES}
            className="mb-5"
          />

          <Content>{children}
          </Content>

        </Layout>
      </body>
    </html>
  );
}
