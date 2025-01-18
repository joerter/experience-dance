export default function ApplicationLogo(props: {
  width: string;
  height: string;
}) {
  return <img width={props.width} height={props.height} src="/images/logo-white.svg" />;
}
