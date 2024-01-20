import { Text, TextProps } from "./Themed";

export function NunitoExtraLightText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "Nunito-ExtraLight" }]}
    />
  );
}

export function NunitoLightText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Nunito-Light" }]} />
  );
}

export function NunitoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Nunito" }]} />;
}

export function NunitoMediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Nunito-Medium" }]} />
  );
}

export function NunitoSemiBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Nunito-SemiBold" }]} />
  );
}

export function NunitoBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Nunito-Bold" }]} />
  );
}

export function NunitoExtraBoldText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "Nunito-ExtraBold" }]}
    />
  );
}

export function NunitoBlackText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Nunito-Black" }]} />
  );
}
