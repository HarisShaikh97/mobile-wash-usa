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

export type UserRole = "customer" | "vendor"

export type AccountStatus = "active" | "inactive" | "banned"

export type AccessToken = string | null

export type Service = {
	title: string
	image: ImageSourcePropType
}

export type JobSubType = {
	id: number
	name: string
	description: string | null
	parent: number
}

export type JobType = {
	id: number
	name: string
	description: string | null
	parent: number
	subTypes: JobSubType[]
}

export type SelectOption = {
	title: string
}

export type Job = {
	id: number
	user_id: number
	service_id: number
	job_title: string
	address: string
	location: {
		lat: number
		lng: number
	}
	budget: number
	status: "in-progress" | "open" | "completed" | "cancelled"
	scheduled_time: string
	job_description: string
	payment_status: number
	created_at: string
	updated_at: string
}

export type FAQ = {
	question: string
	answer: string
}

export type Offer = {
	job_id: Job["id"]
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
	id: number
	full_name: string
	online: boolean
	profile_pic: string
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

export type CustomerSignUpData = {
	full_name: string
	email: string
	phone_number: string
	password: string
	address: string
	role: "customer"
}

export type LoginData = {
	email: string
	password: string
}

export type VerifyRegistrationData = {
	email: string
	otp: string
}

export type ForgotPasswordData = {
	email: string
}

export type VerifyResetPasswordData = {
	email: string
	otp: string
}

export type SetNewPasswordData = {
	accessToken: AccessToken
	password: string
}

export type JobByIdData = {
	accessToken: AccessToken
	jobId: Job["id"]
}

export type ResendOTPData = {
	email: string
}

export type VerifyProfileUpdateData = {
	accessToken: AccessToken
	otp: string
}

export type QueryData = {
	accessToken: AccessToken
}

export type User = {
	id: number
	full_name: string
	email: string
	phone_number: string
	role: UserRole
	address: string | null
	location: {
		lat: number
		lng: number
	}
	business_information: string | null
	profile_pic: string | null
	status: AccountStatus
	onesignal_player_id: string | null
	about: string | null
	created_at: string
}

export type JobTab = "Pending" | "Completed" | "Cancelled"
