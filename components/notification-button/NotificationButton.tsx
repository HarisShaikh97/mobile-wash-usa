import { TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"

interface NotificationButtonProps {
	theme: "light" | "dark"
}

export default function NotificationButton({
	theme
}: NotificationButtonProps): React.ReactElement | null {
	const router = useRouter()

	return (
		<TouchableOpacity
			style={[
				styles.notificationButtonContainer,
				{
					backgroundColor:
						theme === "light"
							? "rgba(255, 255, 255, 0.2)"
							: "#F5F5F5"
				}
			]}
			onPress={() => {
				router.navigate("/user/notifications")
			}}
		>
			<Image
				source={
					theme === "light"
						? require("../../assets/icons/notification.svg")
						: require("../../assets/icons/notification-black.svg")
				}
				style={styles.notificationIcon}
				contentFit="contain"
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	notificationButtonContainer: {
		height: 32.5,
		width: 32.5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	notificationIcon: {
		height: 17.5,
		width: 17.5
	}
})
