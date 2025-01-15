import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const [userName, setUserName] = useState<string>("") // State to store the user's name
	const [password, setPassword] = useState<string>("") // State to store the user's password

	// Memoized function to handle login
	const handleLogin = useCallback((): void => {
		// Navigate to the user home page
		router.navigate("/user/home")
	}, [router])

	// Memoized function to handle sign up
	const handleSignUp = useCallback((): void => {
		// Navigate to the sign up page
		router.navigate("/auth/sign-up")
	}, [router])

	// Memoized function to handle forget password
	const handleForgetPassword = useCallback((): void => {
		// Navigate to the forgot password page
		router.navigate("/auth/forgot-password")
	}, [router])

	return (
		// Main container for the login page
		<View style={styles.container}>
			{/* Title and description wrapper */}
			<View style={styles.titleWrapper}>
				{/* Title text for the login page */}
				<Text style={styles.titleText}>Welcome Back!</Text>
				{/* Description text for the login page */}
				<Text style={styles.descriptionText}>
					Please log in to your account
				</Text>
			</View>
			{/* Form container */}
			<View style={styles.formContainer}>
				{/* Input field for email/number */}
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
				{/* Input field for password */}
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
			{/* Login button */}
			<FormButton
				length="full"
				theme="dark"
				title="Login"
				onPress={handleLogin}
			/>
			{/* Forgot password button */}
			<TouchableOpacity
				style={styles.forgetPasswordButton}
				onPress={handleForgetPassword}
			>
				<Text style={styles.forgetPasswordButtonText}>
					Forgot Password?
				</Text>
			</TouchableOpacity>
			{/* Social login buttons wrapper */}
			<View style={styles.socialLoginButtonsWrapper}>
				{/* Google social login button */}
				<TouchableOpacity style={styles.socialLoginButton}>
					{/* Google icon */}
					<Image
						source={require("../../../assets/icons/google.svg")}
						alt="google"
						style={styles.socialIcon}
						contentFit="contain"
					/>
					{/* Text for the Google social login button */}
					<Text style={styles.socialLoginButtonText}>
						Continue With Google
					</Text>
				</TouchableOpacity>
				{/* Facebook social login button */}
				<TouchableOpacity style={styles.socialLoginButton}>
					{/* Facebook icon */}
					<Image
						source={require("../../../assets/icons/facebook.svg")}
						alt="facebook"
						style={styles.socialIcon}
						contentFit="contain"
					/>
					{/* Text for the Facebook social login button */}
					<Text style={styles.socialLoginButtonText}>
						Continue With Facebook
					</Text>
				</TouchableOpacity>
			</View>
			{/* Sign up text wrapper */}
			<View style={styles.signUpTextWrapper}>
				{/* Text for new users */}
				<Text style={[styles.signUpText, styles.signUpTextBlack]}>
					New to Mobile Wash USA?
				</Text>
				{/* Sign up button */}
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
