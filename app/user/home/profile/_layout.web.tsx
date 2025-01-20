import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import { WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// Main wrapper view with background color and padding
		<View style={styles.wrapper}>
			{/* Container view that holds the Slot component */}
			<View style={styles.container}>
				{/* Slot component for rendering nested routes */}
				<Slot />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		paddingLeft: WEB_SIDE_NAV_WIDTH
	},
	container: {
		flex: 1,
		padding: 35
	}
})
