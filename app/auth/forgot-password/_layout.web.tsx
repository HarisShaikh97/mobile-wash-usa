import { View, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	// The layout is a background image with a back button and a card container
	return (
		// Use ImageBackground component to set the background image
		<ImageBackground
			source={require("../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* Render the back button component */}
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
					{/* Render the dynamic content slot */}
					<Slot />
				</View>
			</View>
			{/* Render the arc image */}
			<Image
				source={require("../../../assets/images/security-arc.png")}
				style={styles.arcImage}
				contentFit="fill"
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		flexDirection: "column",
		padding: 35,
		position: "relative"
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 550,
		flexDirection: "column",
		alignItems: "center",
		padding: 65,
		backgroundColor: "white",
		borderRadius: 27.5
	},
	arcImage: {
		position: "absolute",
		right: 0,
		bottom: 0,
		height: 185,
		width: 200
	}
})
