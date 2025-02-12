import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Main container with background and padding
		<View style={styles.container}>
			{/* Back navigation button */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Container for centering content */}
			<View style={styles.bodyContainer}>
				{/* White card container with rounded corners */}
				<View style={styles.cardContainer}>
					{/* Slot for child components */}
					<Slot />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		flexDirection: "column",
		padding: 35
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 550,
		backgroundColor: "white",
		borderRadius: 25,
		paddingVertical: 50,
		paddingHorizontal: 75
	}
})
