import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="transparent"
					borderColor="transparent"
				/>
			</View>
			<Slot />
			<Image
				source={require("../../../assets/images/verify-account-bg.png")}
				alt="sign-up"
				style={styles.bgImage}
				contentFit="fill"
			/>
		</View>
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
	bgImage: {
		width: "100%",
		height: 350,
		position: "absolute",
		left: 0,
		bottom: 0,
		zIndex: -10
	}
})
