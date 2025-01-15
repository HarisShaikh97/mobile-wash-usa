import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initialize useRouter hook for navigation

	// Memoized function to handle customer selection
	const handleSelectCustomer = useCallback((): void => {
		router.navigate("/auth/sign-up/customer") // Navigating to the customer sign up page
	}, [router])

	// Memoized function to handle vendor selection
	const handleSelectVendor = useCallback((): void => {
		router.navigate("/auth/sign-up/vendor") // Navigating to the vendor sign up page
	}, [router])

	return (
		<View style={styles.container}>
			{/* Header container for the back button */}
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
			</View>
			{/* Body container for the main content */}
			<View style={styles.bodyContainer}>
				{/* Title text for the welcome message */}
				<Text style={styles.titleText}>Welcome</Text>
				{/* Description text for the user role selection */}
				<Text style={styles.descriptionText}>
					Are you a Customer or a Vendor?
				</Text>
				{/* Container for the user role options */}
				<View style={styles.userRolesOptionsWrapper}>
					{/* Option for selecting customer role */}
					<TouchableOpacity
						style={styles.userRoleOption}
						onPress={handleSelectCustomer}
					>
						<Text style={styles.userRoleOptionText}>
							I am a Customer
						</Text>
					</TouchableOpacity>
					{/* Option for selecting vendor role */}
					<TouchableOpacity
						style={styles.userRoleOption}
						onPress={handleSelectVendor}
					>
						<Text style={styles.userRoleOptionText}>
							I am a Vendor
						</Text>
					</TouchableOpacity>
				</View>
				{/* Background image for the sign-up page */}
				<Image
					source={require("../../../assets/images/sign-up-bg.png")}
					alt="sign-up"
					style={styles.bgImage}
					contentFit="fill"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		position: "relative",
		paddingTop: 35
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 35,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 20,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 185,
		paddingTop: 5,
		lineHeight: 20
	},
	bgImage: {
		width: "100%",
		height: 300,
		position: "absolute",
		left: 0,
		bottom: 0,
		zIndex: 0
	},
	userRolesOptionsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 50,
		zIndex: 10
	},
	userRoleOption: {
		height: 100,
		width: 265,
		borderRadius: 12.5,
		borderWidth: 2,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	userRoleOptionText: {
		fontSize: 16.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	}
})
