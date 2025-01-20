import { View, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// ImageBackground component for setting the background image of the screen
		<ImageBackground
			source={require("../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			{/* View component for the header container */}
			<View style={styles.headerContainer}>
				{/* BackButton component for navigation */}
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			{/* Image component for the security arc image */}
			<Image
				source={require("../../../assets/images/security-arc.png")}
				style={styles.arcImage}
				contentFit="fill"
			/>
			{/* Slot component for dynamic content rendering */}
			<Slot />
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 20,
		position: "relative",
		backgroundColor: "white"
	},
	headerContainer: {
		paddingVertical: 25
	},
	arcImage: {
		position: "absolute",
		right: 0,
		bottom: 0,
		height: 150,
		width: 135
	}
})
