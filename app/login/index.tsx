import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import InputField from "../../components/input-field/InputField"
import FormButton from "../../components/form-button/FormButton"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleLogin = useCallback((): void => {}, [])
	const handleForgetPassword = useCallback((): void => {
		router.navigate("/forgot-password")
	}, [])

	return (
		<View style={styles.container}>
			{fontsLoaded && (
				<Text style={styles.titleText} numberOfLines={2}>
					Welcome Back!
				</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					Please log in to your account
				</Text>
			)}
			<View style={styles.formContainer}>
				<InputField
					title="Email/Number"
					placeholder="Email or phone number"
					value={userName}
					onChangeText={setUserName}
					secureTextEntry={false}
				/>
				<InputField
					title="Password"
					placeholder="********"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
				<FormButton title="Login" onPress={handleLogin} />
				<TouchableOpacity
					style={styles.forgetPasswordButton}
					onPress={handleForgetPassword}
				>
					{fontsLoaded && (
						<Text style={styles.forgetPasswordButtonText}>
							Forgot Password?
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.socialLoginButton}>
				<Image
					source={require("../../assets/icons/google.svg")}
					alt="google"
					style={styles.socialIcon}
					contentFit="contain"
				/>
				{fontsLoaded && (
					<Text style={styles.socialLoginButtonText}>
						Continue With Google
					</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.socialLoginButton}>
				<Image
					source={require("../../assets/icons/facebook.svg")}
					alt="facebook"
					style={styles.socialIcon}
					contentFit="contain"
				/>
				{fontsLoaded && (
					<Text style={styles.socialLoginButtonText}>
						Continue With Facebook
					</Text>
				)}
			</TouchableOpacity>
			<View style={styles.signUpTextWrapper}>
				{fontsLoaded && (
					<Text style={[styles.signUpText, styles.signUpTextBlack]}>
						New to Mobile Wash USA?
					</Text>
				)}
				<TouchableOpacity>
					{fontsLoaded && (
						<Text
							style={[styles.signUpText, styles.signUpTextBlue]}
						>
							Sign Up
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		paddingHorizontal: 35,
		paddingTop: 15,
		gap: 10
	},
	titleText: {
		width: 200,
		fontFamily: "Montserrat-Bold",
		fontSize: 35,
		color: theme.colors.secondary
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 13.5,
		color: theme.colors.secondary
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingVertical: 15
	},
	forgetPasswordButton: {
		alignSelf: "flex-end"
	},
	forgetPasswordButtonText: {
		fontFamily: "Roboto-Medium",
		fontSize: 12.5,
		color: theme.colors.secondary
	},
	socialLoginButton: {
		width: "100%",
		height: 50,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		paddingLeft: "17.5%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)"
	},
	socialLoginButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	socialIcon: {
		height: 15,
		width: 15
	},
	signUpTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginTop: 15
	},
	signUpText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium"
	},
	signUpTextBlack: {
		color: theme.colors.secondary
	},
	signUpTextBlue: {
		color: theme.colors.primary
	}
})
