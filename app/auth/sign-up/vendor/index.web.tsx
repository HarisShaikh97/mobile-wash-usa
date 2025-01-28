import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { DocumentPickerResult } from "expo-document-picker"
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
	const [businessInformation, setBusinessInformation] = useState<string>("") // State to store the user's business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State to store the user's documents

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
			{/* Wrapper for the sign up forms */}
			<View style={styles.formsWrapper}>
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
				</View>
				{/* Container for the sign up form */}
				<View style={styles.formContainer}>
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
					{/* Container for document input */}
					<View style={styles.documentInputWrapper}>
						<InputField
							length="full"
							title="Upload Documents"
							placeholder="Insurance, Business License, etc."
							files={documents}
							onUploadFile={setDocuments}
							type="file"
						/>
						{/* Description text for document input */}
						<View
							style={styles.documentInputDescriptionTextWrapper}
						>
							<View style={styles.bulletMarker} />
							<Text style={styles.documentInputDescriptionText}>
								Upload PDF or Image Documents As Proof Of
								Business Verification.
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
				</View>
			</View>
			{/* Container for policy and terms text */}
			<View style={styles.policyAndTermsTextContainer}>
				{/* Policy and terms text wrapper */}
				<View style={styles.policyAndTermsTextWrapper}>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						By signing up, you agree to our
					</Text>
					<TouchableOpacity>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsLinkText
							]}
						>
							{" Terms of Service"}
						</Text>
					</TouchableOpacity>
				</View>
				{/* Policy and terms text wrapper */}
				<View style={styles.policyAndTermsTextWrapper}>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						{" and "}
					</Text>
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
			{/* Container for form button */}
			<View style={styles.formButtonWrapper}>
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Sign Up"
					onPress={handleSubmit}
				/>
			</View>
			{/* Container for login text */}
			<View style={styles.loginTextWrapper}>
				{/* Text for existing account prompt */}
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
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 40,
		color: theme.colors.secondary,
		textAlign: "center",
		textTransform: "capitalize"
	},
	formsWrapper: {
		width: "100%",
		flexDirection: "row",
		gap: 25,
		justifyContent: "space-between"
	},
	formContainer: {
		flex: 1,
		flexDirection: "column",
		gap: 25
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
		marginTop: 5
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
		alignItems: "center",
		paddingTop: 10
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	policyAndTermsText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium"
	},
	policyAndTermsTextBlack: {
		color: theme.colors.secondary
	},
	policyAndTermsLinkText: {
		color: theme.colors.primary
	},
	formButtonWrapper: {
		width: "40%"
	},
	loginTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10
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
