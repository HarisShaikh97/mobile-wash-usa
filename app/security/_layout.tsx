import { StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../assets/images/settings-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			<Slot />
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1
	}
})
