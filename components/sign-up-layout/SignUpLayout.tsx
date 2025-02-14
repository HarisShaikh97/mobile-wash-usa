import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { usePathname } from "expo-router"
import BackButton from "../back-button/BackButton"

export default function SignUpLayout({
	children
}: {
	children: React.ReactNode
}): React.ReactElement | null {
	// Get the current pathname from the router
	const pathname = usePathname()

	return (
		// KeyboardAvoidingView handles keyboard overlap with form inputs
		<KeyboardAvoidingView
			style={styles.scrollViewContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* ScrollView enables scrolling when content exceeds screen height */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Main container for sign up content */}
				<View style={styles.container}>
					{/* Header image that changes based on user type (customer/vendor) */}
					<ImageBackground
						source={
							pathname === "/sign-up/customer"
								? require("../../assets/images/customer-sign-up-header.png")
								: require("../../assets/images/vendor-sign-up-header.png")
						}
						style={styles.headerContainer}
						contentFit="fill"
					>
						{/* Navigation back button */}
						<BackButton
							size="small"
							color="#000000"
							backgroundColor="transparent"
							borderColor="transparent"
						/>
					</ImageBackground>
					{/* Render child components (sign up form) */}
					{children}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column"
	},
	headerContainer: {
		height: 135,
		paddingHorizontal: 20,
		paddingTop: 35
	},
	scrollViewContainer: {
		flex: 1,
		backgroundColor: "white"
	}
})
