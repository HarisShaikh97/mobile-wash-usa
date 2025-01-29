import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { signUp } from "../../../../helpers/auth"
import { addVerificationEmail } from "../../../../features/email-verification/emailVerificationSlice"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	// State variables for form fields
	const [fullName, setFullName] = useState<string>("") // State to store the user's full name
	const [email, setEmail] = useState<string>("") // State to store the user's email
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State to store the user's phone number
	const [password, setPassword] = useState<string>("") // State to store the user's password
	const [location, setLocation] = useState<string>("") // State to store the user's location

	// Memoized function to handle sign up success
	const handleSuccess = useCallback(
		(data: any) => {
			console.log(data)

			// Dispatch action to store email for verification
			dispatch(
				addVerificationEmail({
					email: email
				})
			)

			router.navigate("/auth/sign-up/verification-code") // Navigating to the verification code page
		},
		[router, email, dispatch, addVerificationEmail]
	)

	// Memoized function to handle sign up error
	const handleError = useCallback((error: any) => {
		console.log(error)
	}, [])

	// Mutation hook to handle sign up
	const { mutate, isPending } = useMutation({
		mutationFn: signUp,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Mutate the sign up function with the user's information
		mutate({
			full_name: fullName,
			email: email,
			phone_number: phoneNumber,
			password: password,
			address: location,
			role: "customer"
		})
	}, [mutate, fullName, email, phoneNumber, password, location])

	// Memoized function to handle login
	const handleLogin = useCallback((): void => {
		// Navigate to the user home page
		router.navigate("/auth/login")
	}, [router])

	return (
		// Main container for the sign up page
		<View style={styles.bodyContainer}>
			{/* Title text for the sign up page */}
			<Text style={styles.titleText}>Sign Up</Text>
			{/* Container for the sign up form */}
			<View style={styles.formContainer}>
				{/* Input field for full name */}
				<InputField
					length="full"
					title="Full Name"
					placeholder="Enter your full name"
					value={fullName}
					onChangeText={setFullName}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				{/* Input field for email */}
				<InputField
					length="full"
					title="Email"
					placeholder="Enter your email address"
					value={email}
					onChangeText={setEmail}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				{/* Input field for phone number */}
				<InputField
					length="full"
					title="Phone Number"
					placeholder="Enter your phone number"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				{/* Input field for password */}
				<InputField
					length="full"
					title="Password"
					placeholder="**********"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
					multiline={false}
					type="text"
				/>
				{/* Input field for location */}
				<InputField
					length="full"
					title="Location"
					placeholder="Enter your location"
					value={location}
					onChangeText={setLocation}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				{/* Container for policy and terms text */}
				<View style={styles.policyAndTermsTextContainer}>
					{/* Policy and terms text */}
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						By signing up, you agree to our
					</Text>
					{/* Wrapper for policy and terms links */}
					<View style={styles.policyAndTermsTextWrapper}>
						{/* Terms of service link */}
						<TouchableOpacity>
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsLinkText
								]}
							>
								Terms of Service
							</Text>
						</TouchableOpacity>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsTextBlack
							]}
						>
							{" and "}
						</Text>
						{/* Privacy policy link */}
						<TouchableOpacity>
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsLinkText
								]}
							>
								Privacy Policy
							</Text>
						</TouchableOpacity>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsTextBlack
							]}
						>
							.
						</Text>
					</View>
				</View>
				{/* Sign up button */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={isPending}
					title="Sign Up"
					onPress={handleSubmit}
				/>
				{/* Container for login text */}
				<View style={styles.loginTextWrapper}>
					{/* Login text */}
					<Text style={[styles.loginText, styles.loginTextBlack]}>
						Already have an account?
					</Text>
					{/* Login button */}
					<TouchableOpacity onPress={handleLogin}>
						<Text style={[styles.loginText, styles.loginTextBlue]}>
							Login
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35,
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingTop: 20,
		paddingBottom: 35
	},
	policyAndTermsTextContainer: {
		width: "100%",
		flexDirection: "column",
		paddingBottom: 10,
		paddingHorizontal: 10
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	policyAndTermsText: {
		fontSize: 13.5
	},
	policyAndTermsTextBlack: {
		color: theme.colors.secondary,
		fontFamily: "Roboto-Regular"
	},
	policyAndTermsLinkText: {
		color: theme.colors.primary,
		fontFamily: "Roboto-Medium"
	},
	loginTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginTop: 15
	},
	loginText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium"
	},
	loginTextBlack: {
		color: theme.colors.secondary
	},
	loginTextBlue: {
		color: theme.colors.primary
	}
})
