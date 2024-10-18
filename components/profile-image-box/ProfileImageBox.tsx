import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"

export default function ProfileImageBox(): React.ReactElement | null {
	return (
		<View style={styles.profileImageContainer}>
			<Image
				source={require("../../assets/images/profile.png")}
				style={styles.profileImage}
				contentFit="cover"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImageContainer: {
		height: 55,
		width: 55,
		borderRadius: 13.5,
		borderWidth: 1.15,
		borderColor: "white",
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center"
	},
	profileImage: {
		height: 60,
		width: 60
	}
})
