import { Image } from 'react-native';

export function RoundIcon(props: Image['props']) {
  const defaultProps = { height: 40, width: 40, borderRadius: 20, borderWidth: 0.2 };
  return <Image {...props} style={[defaultProps, props.style]}></Image>;
}
