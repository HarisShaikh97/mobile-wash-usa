import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import InputField from "../../components/input-field/InputField"
import FormButton from "../../components/form-button/FormButton"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [userName, setUserName] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSubmit = useCallback((): void => {
		router.navigate("/forgot-password/verification-code")
	}, [])

	return (
		<View style={styles.bodyContainer}>
			{fontsLoaded && (
				<Text style={styles.titleText}>Forgot Your Password?</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					Enter your registered email address or phone number, and
					we’ll send you a link or code to reset your password.
				</Text>
			)}
			<View style={styles.formContainer}>
				<InputField
					title="Email/Number"
					placeholder="Enter your email or phone number"
					value={userName}
					onChangeText={setUserName}
					secureTextEntry={false}
				/>
				<FormButton title="Send" onPress={handleSubmit} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35,
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 20,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 12.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 250,
		paddingTop: 7.5,
		lineHeight: 20
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingTop: 20
	}
})
