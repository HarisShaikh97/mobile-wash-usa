import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return (
		<View style={styles.wrapper}>
			<Image
				source={require("../../../../assets/images/add-job-header.png")}
				style={styles.headerImage}
				contentFit="fill"
			/>
			<Slot />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	headerImage: {
		position: "absolute",
		top: 0,
		left: 0,
		height: 185,
		width: "100%",
		opacity: 0.25
	}
})
