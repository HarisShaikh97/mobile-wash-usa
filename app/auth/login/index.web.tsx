import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const handleLogin = useCallback((): void => {
		router.navigate("/user/home")
	}, [router])

	const handleSignUp = useCallback((): void => {
		router.navigate("/auth/sign-up")
	}, [router])

	const handleForgetPassword = useCallback((): void => {
		router.navigate("/auth/forgot-password")
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.titleWrapper}>
				<Text style={styles.titleText}>Welcome Back!</Text>
				<Text style={styles.descriptionText}>
					Please log in to your account
				</Text>
			</View>
			<View style={styles.formContainer}>
				<InputField
					length="full"
					title="Email/Number"
					placeholder="Email or phone number"
					value={userName}
					onChangeText={setUserName}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				<InputField
					length="full"
					title="Password"
					placeholder="********"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
					multiline={false}
					type="text"
				/>
			</View>
			<FormButton
				length="full"
				theme="dark"
				title="Login"
				onPress={handleLogin}
			/>
			<TouchableOpacity
				style={styles.forgetPasswordButton}
				onPress={handleForgetPassword}
			>
				<Text style={styles.forgetPasswordButtonText}>
					Forgot Password?
				</Text>
			</TouchableOpacity>
			<View style={styles.socialLoginButtonsWrapper}>
				<TouchableOpacity style={styles.socialLoginButton}>
					<Image
						source={require("../../../assets/icons/google.svg")}
						alt="google"
						style={styles.socialIcon}
						contentFit="contain"
					/>
					<Text style={styles.socialLoginButtonText}>
						Continue With Google
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialLoginButton}>
					<Image
						source={require("../../../assets/icons/facebook.svg")}
						alt="facebook"
						style={styles.socialIcon}
						contentFit="contain"
					/>
					<Text style={styles.socialLoginButtonText}>
						Continue With Facebook
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.signUpTextWrapper}>
				<Text style={[styles.signUpText, styles.signUpTextBlack]}>
					New to Mobile Wash USA?
				</Text>
				<TouchableOpacity onPress={handleSignUp}>
					<Text style={[styles.signUpText, styles.signUpTextBlue]}>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		gap: 15
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 2.5
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 40,
		color: theme.colors.secondary,
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 17.5,
		color: theme.colors.secondary
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15,
		paddingTop: 35,
		paddingBottom: 15
	},
	forgetPasswordButton: {
		alignSelf: "flex-end",
		marginRight: 25
	},
	forgetPasswordButtonText: {
		fontFamily: "Roboto-Medium",
		fontSize: 13.5,
		color: theme.colors.secondary
	},
	socialLoginButtonsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		paddingTop: 20
	},
	socialLoginButton: {
		width: 325,
		height: 50,
		borderRadius: 12.5,
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		paddingLeft: "20%",
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
		marginTop: 10
	},
	signUpText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium"
	},
	signUpTextBlack: {
		color: theme.colors.secondary
	},
	signUpTextBlue: {
		color: theme.colors.primary
	}
})
