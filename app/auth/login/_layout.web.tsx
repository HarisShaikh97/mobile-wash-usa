import { View, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../../assets/images/login-image-web.png")}
			style={styles.wrapper}
			contentFit="cover"
		>
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			<View style={styles.formCardContainer}>
				<Slot />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: "100%",
		width: "100%",
		backgroundColor: "white",
		position: "relative",
		padding: 35
	},
	formCardContainer: {
		width: 585,
		paddingHorizontal: 100,
		paddingVertical: 75,
		borderRadius: 25,
		borderWidth: 3,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		position: "absolute",
		top: 100,
		right: 145,
		zIndex: 50
	}
})
