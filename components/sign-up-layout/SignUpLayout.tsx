import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	ImageBackground,
	Platform,
	StyleSheet
} from "react-native"
import BackButton from "../../components/back-button/BackButton"

export default function SignUpLayout({
	children
}: {
	children: React.ReactNode
}): React.ReactElement | null {
	return (
		<KeyboardAvoidingView
			style={styles.scrollViewContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<ImageBackground
						source={require("../../assets/images/customer-sign-up-header.png")}
						style={styles.headerContainer}
						resizeMode="stretch"
					>
						<BackButton />
					</ImageBackground>
					{children}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column"
	},
	headerContainer: {
		height: 135,
		paddingHorizontal: 20,
		paddingTop: 35
	},
	scrollViewContainer: {
		flex: 1,
		backgroundColor: "white"
	}
})
