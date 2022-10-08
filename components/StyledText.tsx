import { Text, TextProps } from './Themed';

export function ScreenTitle(props: TextProps) {
  return <Text {...props} style={[{ fontWeight: 'bold', fontSize: 32 }, props.style]} />;
}
