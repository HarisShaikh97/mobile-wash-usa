import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { DocumentPickerResult } from "expo-document-picker"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing useRouter for navigation

	const [fullName, setFullName] = useState<string>("") // State for full name
	const [email, setEmail] = useState<string>("") // State for email
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State for phone number
	const [password, setPassword] = useState<string>("") // State for password
	const [location, setLocation] = useState<string>("") // State for location
	const [businessInformation, setBusinessInformation] = useState<string>("") // State for business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State for documents

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		router.navigate("/auth/sign-up/verification-code") // Navigating to verification code page on submit
	}, [router])

	// Memoized function to handle login
	const handleLogin = useCallback((): void => {
		router.navigate("/auth/login") // Navigating to login page
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
				{/* Input field for business information */}
				<InputField
					length="full"
					title="Business Information"
					placeholder="Tell us about your business or the services you provide."
					value={businessInformation}
					onChangeText={setBusinessInformation}
					secureTextEntry={false}
					multiline={true}
					size="small"
					type="text"
				/>
				{/* Container for document upload */}
				<View style={styles.documentInputWrapper}>
					{/* Input field for document upload */}
					<InputField
						length="full"
						title="Upload Documents"
						placeholder="Insurance, Business License, etc."
						files={documents}
						onUploadFile={setDocuments}
						type="file"
					/>
					{/* Container for document upload description */}
					<View style={styles.documentInputDescriptionTextWrapper}>
						{/* Bullet marker for document upload description */}
						<View style={styles.bulletMarker} />
						{/* Text for document upload description */}
						<Text style={styles.documentInputDescriptionText}>
							Upload PDF or Image Documents As Proof Of Business
							Verification.
						</Text>
					</View>
				</View>
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
					{/* Text for policy and terms */}
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						By signing up, you agree to our
					</Text>
					{/* Container for policy and terms links */}
					<View style={styles.policyAndTermsTextWrapper}>
						{/* Link for terms of service */}
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
						{/* Link for privacy policy */}
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
				{/* Button for sign up */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Sign Up"
					onPress={handleSubmit}
				/>
				{/* Container for login text */}
				<View style={styles.loginTextWrapper}>
					{/* Text for login */}
					<Text style={[styles.loginText, styles.loginTextBlack]}>
						Already have an account?
					</Text>
					{/* Button for login */}
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
	documentInputWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	bulletMarker: {
		height: 3.5,
		width: 3.5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.secondary,
		marginTop: 7.5
	},
	documentInputDescriptionTextWrapper: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 25,
		paddingBottom: 5
	},
	documentInputDescriptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
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
