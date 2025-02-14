import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ProfileCardProps {
	onPress: () => void
}

export default function ProfileCardWeb({
	onPress
}: ProfileCardProps): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	return (
		// Container for the profile card
		<TouchableOpacity style={styles.profileCard} onPress={onPress}>
			{/* Profile image */}
			<Image
				source={
					user && user.profile_pic && user.profile_pic.length > 0
						? {
								uri: `${BASE_URL}/storage/${user.profile_pic}`
						  }
						: require("../../assets/images/profile.png")
				}
				style={styles.profileImage}
				contentFit="cover"
			/>
			{/* User name */}
			<Text style={styles.userNameText}>
				{(user && user.full_name) || ""}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
		gap: 10,
		borderRadius: 8.5,
		backgroundColor: "white"
	},
	profileImage: {
		height: 50,
		width: 50,
		borderRadius: 8.5,
		overflow: "hidden"
	},
	userNameText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		marginRight: 10
	}
})
