import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { DocumentPickerResult } from "expo-document-picker"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { vendorSignUp } from "../../../../helpers/auth"
import { addVerificationEmail } from "../../../../features/email-verification/emailVerificationSlice"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing useRouter for navigation

	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	const [fullName, setFullName] = useState<string>("") // State for full name
	const [email, setEmail] = useState<string>("") // State for email
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State for phone number
	const [password, setPassword] = useState<string>("") // State for password
	const [location, setLocation] = useState<string>("") // State for location
	const [businessInformation, setBusinessInformation] = useState<string>("") // State for business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State for documents

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
		mutationFn: vendorSignUp,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback(async (): Promise<void> => {
		// Create a new FormData instance to send data to the server
		const formData = new FormData()

		// Append user's personal information
		formData.append("full_name", fullName)
		formData.append("email", email)
		formData.append("phone_number", phoneNumber)
		formData.append("password", password)
		formData.append("address", location)

		// Set user role as vendor
		formData.append("role", "vendor")

		// Append business-specific information
		formData.append("business_information", businessInformation)

		// Append documents if they exist
		if (documents && documents.assets && documents.assets.length > 0) {
			// Fetch each asset and append it to the form data
			const fetchPromises = documents.assets.map(async (asset, index) => {
				return fetch(asset.uri)
					.then((response) => response.blob()) // Fetch the blob from the asset's URI
					.then((blob) => {
						// Create a new File object with the blob and asset's name
						const file = new File(
							[blob],
							asset.name || `document_${index}`,
							{
								type:
									asset.mimeType ||
									"application/octet-stream",
								lastModified: Date.now()
							}
						)
						// Append the file to the form data
						formData.append("documents[]", file, file.name)
					})
			})

			// Wait for all promises to resolve and append the documents to the form data
			await Promise.all(fetchPromises)
				.then(() => {
					console.log("Documents appended to form data successfully")
				})
				.catch((error) => {
					console.error("Error fetching assets:", error)
				})
		}

		// Mutate the sign up function with the user's information
		mutate(formData)
	}, [
		mutate,
		fullName,
		email,
		phoneNumber,
		password,
		location,
		businessInformation,
		documents
	])

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
					isLoading={isPending}
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
