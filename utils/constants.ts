import { ImageSourcePropType } from "react-native"
import { Theme, HexColor, Service, FAQ } from "./types"

export const theme: Theme = {
	colors: {
		primary: "#2F74FA" as HexColor,
		secondary: "#000000" as HexColor,
		tertiary: "#1A3D7C" as HexColor
	}
}

export const backgroundImages: ImageSourcePropType[] = [
	require("../assets/images/background1.png"),
	require("../assets/images/background2.png"),
	require("../assets/images/background3.png"),
	require("../assets/images/background4.png")
]

export const services: Service[] = [
	{
		title: "Vehicle Wash & Maintenance",
		image: require("../assets/images/service-1.png")
	},
	{
		title: "Residential Cleaning",
		image: require("../assets/images/service-2.png")
	},
	{
		title: "Commercial Services",
		image: require("../assets/images/service-3.png")
	}
]

export const FAQs: FAQ[] = [
	{
		question: "How do I create an account?",
		answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. aliquip ex ea commodo consequat. Duis aute irure dolor."
	},
	{
		question: "How do I reset my password?",
		answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. aliquip ex ea commodo consequat. Duis aute irure dolor."
	},
	{
		question: "How can I contact a seller?",
		answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. aliquip ex ea commodo consequat. Duis aute irure dolor."
	}
]
