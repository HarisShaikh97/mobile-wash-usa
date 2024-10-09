import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import Feather from "@expo/vector-icons/Feather"
import { theme } from "../../utils/constants"

export default function Page() {
	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

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
				<View style={styles.inputFieldWrapper}>
					{fontsLoaded && (
						<Text style={styles.inputFieldTitleText}>
							Email/Number
						</Text>
					)}
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder="Email or phone number"
							placeholderTextColor={"rgba(173, 173, 173, 0.5)"}
						/>
					</View>
				</View>
				<View style={styles.inputFieldWrapper}>
					{fontsLoaded && (
						<Text style={styles.inputFieldTitleText}>Password</Text>
					)}
					<View style={styles.inputFieldContainer}>
						<TextInput
							style={styles.inputField}
							placeholder="********"
							placeholderTextColor={"rgba(173, 173, 173, 0.5)"}
							secureTextEntry={!isPasswordVisible}
						/>
						<TouchableOpacity
							onPress={() =>
								setIsPasswordVisible(!isPasswordVisible)
							}
						>
							{isPasswordVisible ? (
								<Feather
									name="eye-off"
									size={15}
									color="rgba(173, 173, 173, 0.5)"
								/>
							) : (
								<Feather
									name="eye"
									size={15}
									color="rgba(173, 173, 173, 0.5)"
								/>
							)}
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={[styles.buttonContainer, styles.loginButton]}
				>
					<Text style={styles.loginButtonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.forgetPasswordButton}>
					<Text style={styles.forgetPasswordButtonText}>
						Forgot Password?
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[styles.buttonContainer, styles.socialLoginButton]}
			>
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
			<TouchableOpacity
				style={[styles.buttonContainer, styles.socialLoginButton]}
			>
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
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 35,
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
	inputFieldWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5
	},
	inputFieldTitleText: {
		fontFamily: "Roboto-Regular",
		fontSize: 12.5,
		color: theme.colors.secondary,
		marginLeft: 7.5
	},
	inputFieldContainer: {
		height: 50,
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		paddingHorizontal: 15,
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	inputField: {
		flex: 1,
		fontSize: 15
	},
	buttonContainer: {
		width: "100%",
		height: 50,
		borderRadius: 10
	},
	loginButton: {
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	loginButtonText: {
		fontFamily: "Roboto-Medium",
		fontSize: 15,
		color: "white"
	},
	forgetPasswordButton: {
		alignSelf: "flex-end"
	},
	forgetPasswordButtonText: {
		fontFamily: "Roboto-Regular",
		fontSize: 12.5,
		color: theme.colors.secondary
	},
	socialLoginButton: {
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
