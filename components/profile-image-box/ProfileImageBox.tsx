import { View, StyleSheet, ImageSourcePropType } from "react-native"
import { Image } from "expo-image"

interface ProfileImageBoxProps {
	source: ImageSourcePropType
	mode: "web" | "app"
}

export default function ProfileImageBox({
	source,
	mode
}: ProfileImageBoxProps): React.ReactElement | null {
	return (
		<View
			style={[
				styles.profileImageContainer,
				mode === "app"
					? styles.profileImageContainerApp
					: styles.profileImageContainerWeb
			]}
		>
			<Image
				source={source}
				style={
					mode === "app"
						? styles.profileImageApp
						: styles.profileImageWeb
				}
				contentFit="cover"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImageContainer: {
		borderWidth: 1.15,
		borderColor: "white",
		backgroundColor: "white",
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center"
	},
	profileImageContainerApp: {
		height: 55,
		width: 55,
		borderRadius: 13.5
	},
	profileImageContainerWeb: {
		height: 95,
		width: 95,
		borderRadius: 17.5
	},
	profileImageApp: {
		height: 60,
		width: 60
	},
	profileImageWeb: {
		height: 100,
		width: 100
	}
})
