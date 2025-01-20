import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import { WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// Outermost View component with wrapper styles
		<View style={styles.wrapper}>
			{/* Inner View component with container styles */}
			<View style={styles.container}>
				{/* Slot component for dynamic content rendering */}
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
