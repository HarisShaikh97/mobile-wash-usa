import { View, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import BackButton from "../../../components/back-button/BackButton"

export default function Page(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../../assets/images/map-lg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="#F5F5F5"
				/>
			</View>
			<TouchableOpacity style={styles.locationButton}>
				<Image
					source={require("../../../assets/icons/location-target.svg")}
					style={styles.locationButtonImage}
					contentFit="contain"
				/>
			</TouchableOpacity>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		position: "relative"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	},
	locationButton: {
		height: 35,
		width: 35,
		backgroundColor: "white",
		borderRadius: 5,
		position: "absolute",
		right: 15,
		bottom: 250,
		alignItems: "center",
		justifyContent: "center"
	},
	locationButtonImage: {
		height: 22.5,
		width: 22.5
	}
})
