import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { showToastable } from "react-native-toastable"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { login } from "../../../helpers/auth"
import { createSession } from "../../../features/auth/authSlice"
import { addVerificationEmail } from "../../../features/email-verification/emailVerificationSlice"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	const [userName, setUserName] = useState<string>("") // State to store the user's name
	const [password, setPassword] = useState<string>("") // State to store the user's password

	// Memoized function to handle login success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Get the user's information
			const user = data?.data?.user

			// Get the user's access token
			const accessToken = data?.data?.access_token

			// Get the user's role
			const role = user?.role

			// Check if the user, access token, and role are defined
			if (user && accessToken && role) {
				// Show success toast message
				showToastable({
					message: "Login successful!",
					status: "success"
				})

				// Create a session for the user
				dispatch(
					createSession({
						user: user,
						token: accessToken
					})
				)

				// Check if the user is a vendor or a customer and navigate to the appropriate page
				router.navigate(
					role === "vendor" ? "/vendor/home" : "/user/home"
				)
			} else if (data?.otp_required) {
				// Show warning toast message
				showToastable({
					message:
						data?.messages[0] ||
						"Please verify your account by using the OTP sent to your email.",
					status: "warning"
				})

				// Dispatch action to store email for verification
				dispatch(
					addVerificationEmail({
						email: userName
					})
				)

				// Navigating to the verification code page
				router.navigate("/auth/sign-up/verification-code")
			}
		},
		[
			router,
			dispatch,
			createSession,
			addVerificationEmail,
			userName,
			showToastable
		]
	)

	// Memoized function to handle login error
	const handleError = useCallback(
		(error: any): void => {
			console.log(error)

			// Show error toast message
			showToastable({
				message:
					error?.response?.data?.errors?.messages[0] ||
					"Something went wrong!",
				status: "danger"
			})
		},
		[showToastable]
	)

	// Mutation hook to handle login
	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle login
	const handleLogin = useCallback((): void => {
		// Mutate the login function with the user's name and password
		mutate({ email: userName, password: password })
	}, [mutate, userName, password])

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
				colorTheme="dark"
				isLoading={isPending}
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
