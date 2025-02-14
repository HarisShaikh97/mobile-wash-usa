import { useCallback } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"

// Interface for the props of the component for web
interface NotificationButtonWebProps {
	mode: "web"
}

// Interface for the props of the component for app
interface NotificationButtonAppProps {
	mode: "app"
	theme: "light" | "dark"
}

// Union type for the props of the component (web and app)
type NotificationButtonProps =
	| NotificationButtonWebProps
	| NotificationButtonAppProps

export default function NotificationButton(
	props: NotificationButtonProps
): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Get the current pathname from the router
	const pathname = usePathname()

	// Memoized callback for handling the press event
	const handlePress = useCallback((): void => {
		// Navigate to notifications page based on current path
		router.navigate(
			pathname.includes("/user/")
				? "/user/notifications"
				: "/vendor/notifications"
		)
	}, [pathname, router])

	return (
		// Touchable button container for notifications
		<TouchableOpacity
			style={[
				styles.notificationButtonContainer,
				props.mode === "web"
					? styles.notificationButtonContainerWeb
					: styles.notificationButtonContainerApp,
				{
					backgroundColor:
						props.mode === "web"
							? "white"
							: props.theme === "light"
							? "rgba(255, 255, 255, 0.2)"
							: "#F5F5F5"
				}
			]}
			onPress={handlePress}
		>
			{/* Notification icon image */}
			<Image
				source={
					props.mode === "app" && props.theme === "light"
						? require("../../assets/icons/notification.svg")
						: require("../../assets/icons/notification-black.svg")
				}
				style={
					props.mode === "web"
						? styles.notificationIconWeb
						: styles.notificationIconApp
				}
				contentFit="contain"
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	notificationButtonContainer: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5
	},
	notificationButtonContainerApp: {
		height: 32.5,
		width: 32.5
	},
	notificationButtonContainerWeb: {
		height: 42.5,
		width: 42.5
	},
	notificationIconApp: {
		height: 17.5,
		width: 17.5
	},
	notificationIconWeb: {
		height: 22.5,
		width: 22.5
	}
})
