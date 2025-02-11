import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import { WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// Main container with padding and background color
		<View style={styles.wrapper}>
			{/* Main content container */}
			<View style={styles.container}>
				{/* Slot for nested route content */}
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
		flexDirection: "column",
		padding: 35
	}
})
