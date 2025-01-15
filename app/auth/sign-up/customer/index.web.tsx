import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// State variables for form fields
	const [fullName, setFullName] = useState<string>("") // State to store the user's full name
	const [email, setEmail] = useState<string>("") // State to store the user's email
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State to store the user's phone number
	const [password, setPassword] = useState<string>("") // State to store the user's password
	const [location, setLocation] = useState<string>("") // State to store the user's location

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		router.navigate("/auth/sign-up/verification-code") // Navigating to the verification code page
	}, [router])

	// Memoized function to handle login
	const handleLogin = useCallback((): void => {
		router.navigate("/auth/login") // Navigate to the user home page
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
					{/* Text indicating agreement to policy and terms */}
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
						{/* Link to terms of service */}
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
						{/* Link to privacy policy */}
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
				{/* Form button for sign up */}
				<FormButton
					length="full"
					theme="dark"
					title="Sign Up"
					onPress={handleSubmit}
				/>
				{/* Container for login text */}
				<View style={styles.loginTextWrapper}>
					<Text style={[styles.loginText, styles.loginTextBlack]}>
						Already have an account?
					</Text>
					{/* Link to login page */}
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
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 40,
		color: theme.colors.secondary,
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		marginTop: 25
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
		fontSize: 15
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
		fontSize: 15,
		fontFamily: "Roboto-Medium"
	},
	loginTextBlack: {
		color: theme.colors.secondary
	},
	loginTextBlue: {
		color: theme.colors.primary
	}
})
