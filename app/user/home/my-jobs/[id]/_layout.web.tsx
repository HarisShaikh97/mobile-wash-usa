import { useCallback } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useRouter } from "expo-router"
import { useSelector } from "react-redux"
import ProfileCardWeb from "../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import { RootState } from "../../../../../store/store"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	const router = useRouter() // Using useRouter hook to navigate

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

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
					<ProfileCardWeb
						imageSource={
							user &&
							user.profile_pic &&
							user.profile_pic.length > 0
								? {
										uri: `${BASE_URL}/storage/${user.profile_pic}`
								  }
								: require("../../../../../assets/images/profile.png")
						}
						userName={(user && user.full_name) || ""}
						onPress={handleProfilePress}
					/>
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
