import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

export default function OffersPopup(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Montserrat-Medium": require("../../assets/fonts/Montserrat/Montserrat Medium 500.ttf")
	})

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				{fontsLoaded && <Text style={styles.titleText}>Offers</Text>}
				<TouchableOpacity>
					{fontsLoaded && (
						<Text style={styles.seeAllText}>See All</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: 65,
		width: 225,
		borderRadius: 10,
		backgroundColor: "rgba(47, 116, 250, 0.25)",
		position: "absolute",
		bottom: 125,
		left: "50%",
		transform: [{ translateX: -112.5 }],
		zIndex: 50,
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		height: 55,
		width: 215,
		borderRadius: 8.5,
		backgroundColor: theme.colors.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	titleText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	},
	seeAllText: {
		fontSize: 11.5,
		fontFamily: "Montserrat-Medium",
		color: "white"
	}
})
