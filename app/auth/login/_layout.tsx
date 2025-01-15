import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		<View style={styles.container}>
			{/* Image background for the header section */}
			<ImageBackground
				source={require("../../../assets/images/login-image.png")}
				style={styles.headerBackgroundImage}
				contentFit="cover"
			>
				<View style={styles.headerContainer}>
					{/* Back button component */}
					<BackButton
						size="small"
						color="#000000"
						backgroundColor="rgba(255, 255, 255, 0.15)"
						borderColor="#F5F5F5"
					/>
				</View>
			</ImageBackground>
			{/* Keyboard avoiding view for handling keyboard appearance */}
			<KeyboardAvoidingView
				style={styles.scrollViewContainer}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Slot for dynamic content */}
					<Slot />
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
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
