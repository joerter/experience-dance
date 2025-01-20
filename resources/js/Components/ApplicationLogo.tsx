export default function ApplicationLogo(props: {
  width?: string;
  height?: string;
}) {
  const width = props.width ?? '160px';
  const height = props.width ?? '44px';
  return <img width={width} height={height} src="/images/logo-white.svg" />;
}
