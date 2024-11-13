import { View, StyleSheet, ImageSourcePropType } from "react-native"
import { Image } from "expo-image"

interface ProfileImageBoxProps {
	source: ImageSourcePropType
}

export default function ProfileImageBox({
	source
}: ProfileImageBoxProps): React.ReactElement | null {
	return (
		<View style={styles.profileImageContainer}>
			<Image
				source={source}
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
