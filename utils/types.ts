import { ImageSourcePropType } from "react-native"

export type HexColor = `#${string}`

export type ThemeColors = {
	primary: HexColor
	secondary: HexColor
	tertiary: HexColor
}

export type Theme = {
	colors: ThemeColors
}

export type Service = {
	title: string
	image: ImageSourcePropType
}
