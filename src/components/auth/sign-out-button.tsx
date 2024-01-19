'use client';

import { Button } from '@himalaya-ui/core';
import { Settings, LogOut } from '@himalaya-ui/core/icons';
import { Menu, Avatar, withScale, useScale, useTheme } from '@himalaya-ui/core';
import Link from 'next/link';
import { useAuth } from './auth-context';
import { extractAvatarText } from '../utils/common-utils';

const SignoutButtonComponent = () => {
  const { doLogout, isAuthed, userData } = useAuth();
  const { SCALES } = useScale();
  const theme = useTheme();

  const logout = (e: any) => {
    e.preventDefault();

    doLogout();
  };

  if (isAuthed) {
    return (
      <>
        <div className="flex gap-4 ml-auto mt-5">
          <Menu trigger={<Avatar isSquare src={userData?.profileImage} text={extractAvatarText(userData?.user?.username)} />} placement="bottomEnd">
            <Menu.Item>
              <Link className="menu-link" href="/settings">
                <Settings size={14} />
                Settings
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="menu-link" href="/" onClick={logout}>
                <LogOut size={14} />
                Sign Out
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <style jsx>{`
          .mt-5 {
            margin-top: ${SCALES.mt(0.3125)};
          }
          :global(.menu-link) {
            display: flex;
            gap: ${SCALES.ml(0.5)};
            align-items: center !important;
          }

          :global(.inner) {
            padding: 0 !important;
          }

          :global(.menu-item:last-child) {
            padding-top: ${SCALES.pt(0.5)} !important;
            border-top: 1px solid ${theme.palette.accents_1} !important;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-4 ml-auto mt-5">
        <Menu
          trigger={
            <Button type="primary" pt={0.25} pb={0.25} font={0.9} height={'auto'} auto>
              Sign in
            </Button>
          }
          placement="bottomEnd"
        >
          <Menu.Item></Menu.Item>
          <Menu.Item>
            <Button w={'100%'} onClick={() => window.location.assign(`api/auth/google`)} pt={0.25} pb={0.25} font={0.9} height={'auto'}>
              Login with Google
            </Button>
          </Menu.Item>
        </Menu>
      </div>
      <style jsx>{`
        .mt-5 {
          margin-top: ${SCALES.mt(0.3125)};
        }
        :global(.menu-link) {
          display: flex;
          gap: ${SCALES.ml(0.5)};
          align-items: center !important;
        }

        :global(.inner) {
          padding: 0 !important;
        }

        :global(.menu-item:last-child) {
          padding-top: ${SCALES.pt(0.5)} !important;
          border-top: 1px solid ${theme.palette.accents_1} !important;
        }
      `}</style>
    </>
  );
};

SignoutButtonComponent.displayName = 'SignoutButton';
const SignoutButton = withScale(SignoutButtonComponent);

export default SignoutButton;
