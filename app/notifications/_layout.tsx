import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import BackButton from "../../components/back-button/BackButton"
import { theme } from "../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BackButton
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<TouchableOpacity>
						{fontsLoaded && (
							<Text style={styles.readAllButtonText}>
								Read all
							</Text>
						)}
					</TouchableOpacity>
				</View>
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column",
		paddingHorizontal: 20
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 25
	},
	readAllButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.primary
	}
})
