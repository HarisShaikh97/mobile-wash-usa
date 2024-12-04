import { View, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			<Slot />
			<Image
				source={require("../../../../assets/images/security-arc.png")}
				alt="sign-up"
				style={styles.arcImage}
				contentFit="fill"
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		position: "relative"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	},
	arcImage: {
		position: "absolute",
		right: 0,
		bottom: 0,
		height: 150,
		width: 135
	}
})
