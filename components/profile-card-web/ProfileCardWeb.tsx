import {
	TouchableOpacity,
	Text,
	ImageSourcePropType,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ProfileCardProps {
	imageSource: ImageSourcePropType
	userName: string
	onPress: () => void
}

export default function ProfileCardWeb({
	imageSource,
	userName,
	onPress
}: ProfileCardProps): React.ReactElement | null {
	return (
		// Container for the profile card
		<TouchableOpacity style={styles.profileCard} onPress={onPress}>
			{/* Profile image */}
			<Image
				source={imageSource}
				style={styles.profileImage}
				contentFit="cover"
			/>
			{/* User name */}
			<Text style={styles.userNameText}>{userName}</Text>
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
