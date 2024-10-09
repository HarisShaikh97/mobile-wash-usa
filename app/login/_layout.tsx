import { View, ImageBackground, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../components/back-button/BackButton"

export default function Layout() {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/images/login-image.png")}
				style={styles.headerBackgroundImage}
				resizeMode="cover"
			>
				<View style={styles.headerContainer}>
					<BackButton />
				</View>
			</ImageBackground>
			<Slot />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		gap: 15
	},
	headerBackgroundImage: {
		height: 200,
		width: "100%"
	},
	headerContainer: {
		flex: 1,
		paddingTop: 25,
		paddingLeft: 15
	}
})
