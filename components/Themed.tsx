import { Text as DefaultText, View as DefaultView } from "react-native";

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;

  return <DefaultText style={[style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[style]} {...otherProps} />;
}
