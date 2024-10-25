import { ImageSourcePropType } from "react-native"

export type HexColor = `#${string}`

export type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`

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

export type Job = {
	_id: string
	title: string
	clientName: string
	date: string
	time: string
	description: string
	address: string
	location: {
		lat: number
		lng: number
	}
	budget: number
	images: ImageSourcePropType[]
}

export type FAQ = {
	question: string
	answer: string
}
