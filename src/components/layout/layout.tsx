'use client';

import {
  FixedHeader,
  Header,
  MobileMenu,
  MobileMenuButton,
  MobileMenuProvider,
  Navigation,
  RoutingIndicator,
  ScrollableLayout,
  Search,
  SearchButton,
  SearchProvider,
  SearchResults,
  ThemeSwitcher,
  useLayout,
  useTheme,
} from '@himalaya-ui/core';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import SignoutButton from '../auth/sign-out-button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const layout = useLayout();

  async function doSearch(keyword: string): Promise<SearchResults> {
    return [];
  }

  const [isHidden, setIsHidden] = useState<boolean>(false);
  return (
    <RoutingIndicator>
      <SearchProvider>
        <MobileMenuProvider>
          <ScrollableLayout onScroll={event => setIsHidden(event.scrollTop >= 200)}>
            <FixedHeader hide={pathname == '/' && isHidden}>
              <Header>
                <Header.Left>
                  <MobileMenuButton></MobileMenuButton>
                  <NextLink passHref legacyBehavior href={'/'}>
                    <a className="logo"></a>
                  </NextLink>
                  <NextLink passHref legacyBehavior href={'/'}>
                    <a className="brand">Admin</a>
                  </NextLink>
                </Header.Left>
                <Header.Center>
                  <Navigation>
                    <Navigation.Item title={'Home'} url={'/'}></Navigation.Item>
                    <Navigation.Item title={'Stocks'} url={'/stocks'}>
                      <Navigation.Item.Child title={'Short-term'} url={'/stocks'}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Long-term'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'IPOs'} url={''}></Navigation.Item.Child>
                    </Navigation.Item>
                    <Navigation.Item title={'ETFs'} url={'#'}>
                      <Navigation.Item.Child title={'Short-term'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Long-term'} url={''}></Navigation.Item.Child>
                    </Navigation.Item>
                    <Navigation.Item title={'About'} url={'#'}>
                      <Navigation.Item.Child title={'Scam-products detection'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Why u loose with AI?'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Blog'} url={'/blog'}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'About us'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'For developers'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Data privacy'} url={''}></Navigation.Item.Child>
                      <Navigation.Item.Child title={'Imprint'} url={'/imprint'}></Navigation.Item.Child>
                    </Navigation.Item>
                  </Navigation>
                </Header.Center>
                <Header.Right>
                  <SearchButton></SearchButton>
                  <ThemeSwitcher></ThemeSwitcher>
                  <SignoutButton></SignoutButton>
                </Header.Right>
              </Header>
            </FixedHeader>
            <MobileMenu>
              <MobileMenu.Item url="/" title="Home" />
            </MobileMenu>
            {children}
          </ScrollableLayout>
        </MobileMenuProvider>
        <style global jsx>{`
          .logo,
          .brand {
            display: inline-flex;
            align-items: center;
            color: ${theme.palette.foreground};
          }

          .logo {
            color: ${theme.palette.primary.value};
          }
          .brand {
            margin-left: 6px;
          }

          @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
            .logo {
              display: none;
            }
          }
        `}</style>
        <Search searchFunction={doSearch} placeholder="Search for symbiols.." />
      </SearchProvider>
    </RoutingIndicator>
  );
}
