import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Main container for the layout
		<View style={styles.container}>
			{/* Container for the header content */}
			<View style={styles.headerContainer}>
				{/* Custom BackButton component */}
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			{/* Dynamic content slot */}
			<Slot />
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
		paddingVertical: 25
	}
})
