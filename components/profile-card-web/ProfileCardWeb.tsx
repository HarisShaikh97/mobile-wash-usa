import {
	TouchableOpacity,
	Text,
	ImageSourcePropType,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { theme } from "../../utils/constants"

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
		<TouchableOpacity style={styles.profileCard} onPress={onPress}>
			<Image
				source={imageSource}
				style={styles.profileImage}
				contentFit="cover"
			/>
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
