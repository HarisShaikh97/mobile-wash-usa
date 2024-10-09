import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	ImageBackground,
	Platform,
	StyleSheet
} from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
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
			<KeyboardAvoidingView
				style={styles.scrollViewContainer}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Slot />
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	headerBackgroundImage: {
		height: 200,
		width: "100%"
	},
	headerContainer: {
		flex: 1,
		paddingTop: 25,
		paddingLeft: 15
	},
	scrollViewContainer: {
		flex: 1
	}
})
