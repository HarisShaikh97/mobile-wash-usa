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
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	const [userName, setUserName] = useState<string>("") // State to store the user's name
	const [password, setPassword] = useState<string>("") // State to store the user's password

	// Memoized function to handle login success
	const handleSuccess = useCallback(
		(data: any) => {
			console.log(data)

			// Create a session for the user
			dispatch(
				createSession({
					user: data.data.user,
					token: data.data.access_token
				})
			)

			// Show success toast message
			showToastable({
				message: "Login successful!",
				status: "success"
			})

			// Get the role of the user
			const role = data?.data?.user?.role
			if (role) {
				// Check if the user is a vendor or a customer and navigate to the appropriate page
				router.navigate(
					role === "vendor" ? "/vendor/home" : "/user/home"
				)
			}
		},
		[router, dispatch, createSession]
	)

	// Memoized function to handle login error
	const handleError = useCallback((error: any) => {
		console.log(error)

		// Show error toast message
		showToastable({
			message:
				error?.response?.data?.errors?.messages[0] ||
				"Something went wrong!",
			status: "danger"
		})
	}, [])

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
		router.navigate("/auth/sign-up") // Navigating to the sign up page
	}, [router])

	// Memoized function to handle forget password
	const handleForgetPassword = useCallback((): void => {
		router.navigate("/auth/forgot-password") // Navigating to the forgot password page
	}, [router])

	return (
		// Main container for the login page
		<View style={styles.container}>
			{/* Title text for the login page */}
			<Text style={styles.titleText} numberOfLines={2}>
				Welcome Back!
			</Text>
			{/* Description text for the login page */}
			<Text style={styles.descriptionText}>
				Please log in to your account
			</Text>
			{/* Container for the login form */}
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
				{/* Form button to submit the login form */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={isPending}
					title="Login"
					onPress={handleLogin}
				/>
				{/* Button to navigate to the forgot password page */}
				<TouchableOpacity
					style={styles.forgetPasswordButton}
					onPress={handleForgetPassword}
				>
					{/* Text for the forgot password button */}
					<Text style={styles.forgetPasswordButtonText}>
						Forgot Password?
					</Text>
				</TouchableOpacity>
			</View>
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
			{/* Container for the sign up text */}
			<View style={styles.signUpTextWrapper}>
				{/* Text for the sign up link */}
				<Text style={[styles.signUpText, styles.signUpTextBlack]}>
					New to Mobile Wash USA?
				</Text>
				{/* Button to navigate to the sign up page */}
				<TouchableOpacity onPress={handleSignUp}>
					{/* Text for the sign up button */}
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
		paddingHorizontal: 35,
		paddingVertical: 15,
		gap: 10
	},
	titleText: {
		width: 200,
		fontFamily: "Montserrat-Bold",
		fontSize: 35,
		color: theme.colors.secondary,
		textTransform: "capitalize"
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
