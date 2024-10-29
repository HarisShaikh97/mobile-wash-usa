import {
	KeyboardAvoidingView,
	ScrollView,
	View,
	Text,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import BackButton from "../../components/back-button/BackButton"
import { theme } from "../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf")
	})

	return (
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<ImageBackground
						source={require("../../assets/images/add-job-header.png")}
						style={styles.headerBackgroundImage}
						contentFit="fill"
					>
						<View style={styles.headerContainer}>
							<BackButton
								color="#000000"
								backgroundColor="#F5F5F5"
								borderColor="transparent"
							/>
							{fontsLoaded && (
								<Text style={styles.titleText}>
									Describe Your Job Needs
								</Text>
							)}
						</View>
					</ImageBackground>
					<Slot />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column"
	},
	headerBackgroundImage: {
		width: "100%"
	},
	headerContainer: {
		padding: 25,
		flexDirection: "column",
		gap: 25,
		backgroundColor: "rgba(255, 255, 255, 0.75)"
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 215
	}
})
