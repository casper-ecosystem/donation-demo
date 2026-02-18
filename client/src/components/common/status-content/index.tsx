import { ReactNode } from 'react';
import { FlexRow } from '@make-software/cspr-design';
import { Content, StyledTitle, LoadingSvgIcon } from '@/components';

interface StatusContentProps {
    title: ReactNode;
    subtitle?: ReactNode;
    iconSrc?: string;
}

export const StatusContent = ({
    title,
    subtitle,
    iconSrc,
}: StatusContentProps) => {
    return (
        <FlexRow justify="center" align="center">
            <Content itemsSpacing={54} align={"center"} justify="center">
                {iconSrc && (
                    <LoadingSvgIcon
                        src={iconSrc}
                        width={100}
                        height={100}
                    />
                )}
                <StyledTitle size={1} scale="lg">
                    {title}
                    {subtitle && <div>{subtitle}</div>}
                </StyledTitle>
            </Content>
        </FlexRow>
    );
};
