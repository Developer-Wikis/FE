import styled from '@emotion/styled';
import { theme, ThemeColors } from '~/types/theme';
import IconButton from './IconButton';
import * as icons from './svg';
export interface IconProps {
  name: keyof typeof icons;
  size?: string;
  color?: ThemeColors;
  stroke?: ThemeColors;
  block?: boolean;
}

const Icon = ({ name, size = '20', color = 'white', block = true, ...props }: IconProps) => {
  const SvgIcon = icons[name];
  const StyledSvgIcon = styled(SvgIcon)<{ block: boolean }>`
    display: ${({ block }) => (block ? 'block' : '')};
  `;

  return <StyledSvgIcon width={size} height={size} color={theme.colors[color]} {...props} />;
};

Icon.Button = IconButton;

export default Icon;
