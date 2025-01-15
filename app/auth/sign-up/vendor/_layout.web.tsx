import { View, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Background image container
		<ImageBackground
			source={require("../../../../assets/images/sign-up-image-web2.png")}
			style={styles.wrapper}
			contentFit="cover"
		>
			{/* Back button component */}
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
					{/* Dynamic content slot */}
					<Slot />
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		padding: 35
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10
	},
	cardContainer: {
		width: 915,
		borderRadius: 25,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 50
	}
})
