import { View, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Using ImageBackground to set the background image of the screen
		<ImageBackground
			source={require("../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			{/* Container for the header section */}
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			{/* Rendering the help and support arc image */}
			<Image
				source={require("../../../assets/images/help-and-support-arc.png")}
				style={styles.arcImage}
				contentFit="fill"
			/>
			{/* Slot for dynamic content rendering */}
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
		top: 0,
		height: 175,
		width: 100,
		zIndex: 0
	}
})
