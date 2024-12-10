import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { theme } from "../../utils/constants"

export default function ProfileCardWeb(): React.ReactElement | null {
	return (
		<TouchableOpacity style={styles.profileCard}>
			<Image
				source={require("../../assets/images/profile.png")}
				style={styles.profileImage}
				contentFit="cover"
			/>
			<Text style={styles.userNameText}>John Cosby</Text>
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
