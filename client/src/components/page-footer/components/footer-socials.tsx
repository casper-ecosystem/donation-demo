import React from 'react';

import { makeSocialChannels } from '../page-footer-config';
import { FooterSocialsSection, SocialMediaIconContainer, StyledSocialMediaIcon } from '../styled';

export const FooterSocials: React.FC = () => {
  const socials = makeSocialChannels();

  return (
    <FooterSocialsSection>
      {socials.map((social: any, index: number) => (
        <SocialMediaIconContainer key={social.label + index}>
          <StyledSocialMediaIcon
            key={social.key + 'icon'}
            socialMediaType={social.key}
            userId={social.urlUserId}
          />
        </SocialMediaIconContainer>
      ))}
    </FooterSocialsSection>
  );
};
