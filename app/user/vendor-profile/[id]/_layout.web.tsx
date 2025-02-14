import { useCallback } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot, useRouter } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Memoized function to handle profile press
	const handleProfilePress = useCallback((): void => {
		router.navigate("/user/home/profile") // Navigating to the profile page
	}, [router])

	return (
		// Main scrollable container
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Content wrapper */}
			<View style={styles.scrollContainer}>
				{/* Header section with back button and user info */}
				<View style={styles.headerContainer}>
					{/* Navigation back button */}
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="transparent"
					/>
					{/* User profile and notification section */}
					<View style={styles.headerCardsWrapper}>
						{/* User profile card component */}
						<ProfileCardWeb onPress={handleProfilePress} />
						{/* Notification button component */}
						<NotificationButton mode="web" />
					</View>
				</View>
				{/* Main content area */}
				<View style={styles.bodyWrapper}>
					{/* Background header image */}
					<Image
						source={require("../../../../assets/images/profile-header-bg-web.png")}
						style={styles.backgroundCardContainer}
						contentFit="fill"
					/>
					{/* Content container for child components */}
					<View style={styles.bodyContainer}>
						{/* Dynamic slot for nested content */}
						<Slot />
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE"
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		padding: 35
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerCardsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	bodyWrapper: {
		width: "80%",
		alignItems: "center",
		position: "relative"
	},
	backgroundCardContainer: {
		height: 200,
		width: "100%",
		borderRadius: 17.5,
		backgroundColor: theme.colors.primary,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 65,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		zIndex: -10
	},
	bodyContainer: {
		width: "93.5%",
		zIndex: 10,
		paddingTop: 150
	}
})
