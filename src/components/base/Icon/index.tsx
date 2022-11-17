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
  width?: string;
  height?: string;
  fill?: ThemeColors;
}

const Icon = ({
  name,
  size = '20',
  color = 'white',
  block = true,
  fill,
  stroke,
  width,
  height,
  ...props
}: IconProps) => {
  const SvgIcon = icons[name];
  const colorStyle =
    fill && stroke
      ? { fill: theme.colors[fill], stroke: theme.colors[stroke] }
      : { color: theme.colors[color] };

  const StyledSvgIcon = styled(SvgIcon)<{ block: boolean }>`
    display: ${block ? 'block' : ''};
    width: ${width ? width : size}px;
    height: ${height ? height : size}px;
    ${colorStyle}
  `;

  return <StyledSvgIcon {...props} />;
};

Icon.Button = IconButton;

export default Icon;
