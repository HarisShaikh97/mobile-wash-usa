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

export type SelectOption = {
	title: string
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

export type Offer = {
	job_id: Job["_id"]
	vendor_id: string
	vendorName: string
	vendorImage: ImageSourcePropType
	vendorJobsCompleted: number
	ratings: number
	reviews: number
	amount: number
	location: string
}

export type Chat = {
	_id: string
	fullName: string
	online: boolean
	image: ImageSourcePropType
	lastMessage: string
	lastMessageTime: string
	unreadMessages: number
}

export type Message = {
	_id: string
	text: string
	time: string
	user: string
}

export type Review = {
	vendor_id: string
	userName: string
	image: ImageSourcePropType
	review: string
	rating: number
	time: string
}

export type Notification = {
	_id: string
	type: "message" | "offer" | "security"
	title: string
	description: string
	time: string
}

export type SignUpData = {
	full_name: string
	email: string
	phone_number: string
	password: string
	location: string
	role: "customer" | "vendor"
	businessInformation?: string
	documents?: File[]
}
