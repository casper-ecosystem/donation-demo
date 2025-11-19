import React from 'react';

import MakeLogo from 'assets/logos/make-full.svg';
import CsprSuiteLogo from 'assets/logos/cspr-suite.svg';

import { aboutCSPRSuite, aboutMake } from './page-footer-config';
import { ContentWrapperBottom, ContentWrapperTop, FooterBarColumn, FooterTopBar } from './styled';
import { FooterBottomBarContent, FooterLinkGroup, FooterSocials } from './components';

export const PageFooter: React.FC = () => {
  return (
    <>
      <ContentWrapperTop>
        <FooterTopBar>
          <FooterBarColumn>
            <FooterLinkGroup
              logoSrc={MakeLogo}
              logoAlt="Make Logo"
              logoWidth={142}
              logoHeight={48}
              title="About MAKE"
              items={aboutMake()}
            />
            <FooterSocials />
          </FooterBarColumn>

          <FooterBarColumn>
            <FooterLinkGroup
              logoSrc={CsprSuiteLogo}
              logoAlt="CSPR Suite Logo"
              logoWidth={228}
              logoHeight={40}
              title="CSPR Suite"
              items={aboutCSPRSuite()}
            />
          </FooterBarColumn>
        </FooterTopBar>
      </ContentWrapperTop>

      <ContentWrapperBottom>
        <FooterBottomBarContent />
      </ContentWrapperBottom>
    </>
  );
};
