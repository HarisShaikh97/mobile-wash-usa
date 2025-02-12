import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import { theme } from "../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// ScrollView container for the entire notifications layout
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Main container for content */}
			<View style={styles.container}>
				{/* Header section with back button and 'Read all' button */}
				<View style={styles.headerContainer}>
					{/* Back navigation button */}
					<BackButton
						size="small"
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					{/* 'Read all' button to mark all notifications as read */}
					<TouchableOpacity>
						<Text style={styles.readAllButtonText}>Read all</Text>
					</TouchableOpacity>
				</View>
				{/* Slot component for rendering child routes */}
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column",
		paddingHorizontal: 20
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 25
	},
	readAllButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.primary
	}
})
