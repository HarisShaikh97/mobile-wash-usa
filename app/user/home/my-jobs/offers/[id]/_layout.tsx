import { ScrollView, View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../../../../../components/back-button/BackButton"
import NotificationButton from "../../../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// ScrollView component for displaying scrollable content
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Container for the layout content */}
			<View style={styles.container}>
				{/* Header container for the layout */}
				<View style={styles.headerContainer}>
					{/* BackButton component for navigation */}
					<BackButton
						size="small"
						color={theme.colors.secondary}
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					{/* NotificationButton component for displaying notifications */}
					<NotificationButton theme="dark" mode="app" />
				</View>
				{/* Slot component for rendering dynamic content */}
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 125
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
