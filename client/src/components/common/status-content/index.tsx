import { ReactNode } from 'react';
import { FlexRow } from '@make-software/cspr-design';
import { Content, StyledTitle, LoadingSvgIcon } from '@/components';

interface StatusContentProps {
    title: ReactNode;
    subtitle?: ReactNode;
    iconSrc?: string;
    iconSize?: number;
    titleMargin?: string;
    align?: 'center' | 'left' | 'right';
}

export const StatusContent = ({
    title,
    subtitle,
    iconSrc,
    iconSize = 100,
    titleMargin = '32px 0',
    align = 'center'
}: StatusContentProps) => {
    return (
        <FlexRow justify="center" align="center">
            <Content itemsSpacing={54} align={align} justify="center">
                {iconSrc && (
                    <LoadingSvgIcon
                        src={iconSrc}
                        width={iconSize}
                        height={iconSize}
                    />
                )}
                <StyledTitle size={1} scale="lg" margin={titleMargin}>
                    {title}
                    {subtitle && <div>{subtitle}</div>}
                </StyledTitle>
            </Content>
        </FlexRow>
    );
};
