import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Memoized function to handle customer selection
	const handleSelectCustomer = useCallback((): void => {
		router.navigate("/auth/sign-up/customer") // Navigating to the customer sign up page
	}, [router])

	// Memoized function to handle vendor selection
	const handleSelectVendor = useCallback((): void => {
		router.navigate("/auth/sign-up/vendor") // Navigating to the vendor sign up page
	}, [router])

	return (
		// Background image container for the sign-up page
		<ImageBackground
			source={require("../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* Additional background image for layering */}
			<Image
				source={require("../../../assets/images/sign-up-bg-web2.png")}
				style={styles.bgImage}
				contentFit="fill"
			/>
			{/* Back button component */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Container for the main content */}
			<View style={styles.bodyContainer}>
				{/* Container for the card content */}
				<View style={styles.cardContainer}>
					{/* Title text for the welcome message */}
					<Text style={styles.titleText}>Welcome</Text>
					{/* Description text for the user role selection */}
					<Text style={styles.descriptionText}>
						Are you a Customer or a Vendor?
					</Text>
					{/* Container for the user role options */}
					<View style={styles.userRolesOptionsWrapper}>
						{/* Customer role option */}
						<TouchableOpacity
							style={styles.userRoleOption}
							onPress={handleSelectCustomer}
						>
							<Text style={styles.userRoleOptionText}>
								I am a Customer
							</Text>
						</TouchableOpacity>
						{/* Vendor role option */}
						<TouchableOpacity
							style={styles.userRoleOption}
							onPress={handleSelectVendor}
						>
							<Text style={styles.userRoleOptionText}>
								I am a Vendor
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#F3F8FE",
		position: "relative",
		padding: 35
	},
	bgImage: {
		height: "100%",
		width: 875,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 0
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10
	},
	cardContainer: {
		width: 550,
		borderRadius: 25,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 50
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 42.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 22.5,
		color: theme.colors.secondary,
		textAlign: "center",
		paddingTop: 5,
		lineHeight: 20
	},
	userRolesOptionsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 50
	},
	userRoleOption: {
		height: 115,
		width: 285,
		borderRadius: 12.5,
		borderWidth: 2,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	userRoleOptionText: {
		fontSize: 18.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	}
})
