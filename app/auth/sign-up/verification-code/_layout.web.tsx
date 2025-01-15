import { View, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Using ImageBackground for the background image
		<ImageBackground
			source={require("../../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* Using Image for the verification account background */}
			<Image
				source={require("../../../../assets/images/verify-account-bg.png")}
				alt="sign-up"
				style={styles.bgImage}
				contentFit="fill"
			/>
			{/* Using custom BackButton component for navigation */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Container for the body content */}
			<View style={styles.bodyContainer}>
				{/* Container for the card content */}
				<View style={styles.cardContainer}>
					{/* Slot for dynamic content */}
					<Slot />
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
		bottom: 0,
		right: 0,
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
		padding: 75
	}
})
