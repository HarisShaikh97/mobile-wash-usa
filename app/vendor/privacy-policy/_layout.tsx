import { View, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Background image container for the entire layout
		<ImageBackground
			source={require("../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			{/* Header section containing back navigation */}
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			{/* Slot component for rendering nested routes */}
			<Slot />
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 20,
		backgroundColor: "white"
	},
	headerContainer: {
		paddingVertical: 25
	}
})
