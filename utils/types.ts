export type HexColor = `#${string}`

export type ThemeColors = {
	primary: HexColor
	secondary: HexColor
}

export type Theme = {
	colors: ThemeColors
}
