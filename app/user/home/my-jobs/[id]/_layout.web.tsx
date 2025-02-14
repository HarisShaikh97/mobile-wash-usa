import { useCallback } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useRouter } from "expo-router"
import ProfileCardWeb from "../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const router = useRouter() // Using useRouter hook to navigate

	// Memoized function to handle profile press
	const handleProfilePress = useCallback((): void => {
		router.navigate("/user/home/profile") // Navigating to the profile page
	}, [router])

	return (
		// ScrollView component for displaying scrollable content.
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* View component serving as a container for the scrollable content. */}
			<View style={styles.scrollContainer}>
				{/* View component serving as a container for the header content. */}
				<View style={styles.headerContainer}>
					{/* ProfileCardWeb component displaying user profile information. */}
					<ProfileCardWeb onPress={handleProfilePress} />
					{/* NotificationButton component for displaying notifications. */}
					<NotificationButton mode="web" />
				</View>
				{/* Slot component for rendering dynamic content. */}
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		paddingLeft: WEB_SIDE_NAV_WIDTH
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 50,
		padding: 35
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		alignSelf: "flex-end"
	}
})
