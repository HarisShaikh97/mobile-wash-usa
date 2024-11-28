import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { DocumentPickerResult } from "expo-document-picker"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { signUp } from "../../../../helpers/auth"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fullName, setFullName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [phoneNumber, setPhoneNumber] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [businessInformation, setBusinessInformation] = useState<string>("")
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	)

	const { mutate } = useMutation({
		mutationFn: (data: FormData) => signUp(data),
		onSuccess: (data) => console.log(data),
		onError: (err) => console.log(err)
	})

	const handleSubmit = useCallback((): void => {
		const formData = new FormData()
		formData.append("fullName", fullName)
		formData.append("email", email)
		formData.append("phoneNumber", phoneNumber)
		formData.append("password", password)
		formData.append("location", location)
		formData.append("businessInformation", businessInformation)

		if (documents?.assets) {
			documents.assets.forEach((doc) => {
				const file = new Blob([doc.uri], {
					type: "application/octet-stream"
				})
				formData.append("documents", file, doc.name || "document")
			})
		}

		mutate(formData)
		// router.navigate("/auth/sign-up/verification-code")
	}, [
		router,
		fullName,
		email,
		phoneNumber,
		password,
		location,
		businessInformation,
		documents
	])

	const handleLogin = useCallback((): void => {
		router.navigate("/auth/login")
	}, [router])

	return (
		<View style={styles.bodyContainer}>
			<Text style={styles.titleText}>Sign Up</Text>
			<View style={styles.formContainer}>
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
				<View style={styles.documentInputWrapper}>
					<InputField
						length="full"
						title="Upload Documents"
						placeholder="Insurance, Business License, etc."
						files={documents}
						onUploadFile={setDocuments}
						type="file"
					/>
					<View style={styles.documentInputDescriptionTextWrapper}>
						<View style={styles.bulletMarker} />
						<Text style={styles.documentInputDescriptionText}>
							Upload PDF or Image Documents As Proof Of Business
							Verification.
						</Text>
					</View>
				</View>
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
				<View style={styles.policyAndTermsTextContainer}>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						By signing up, you agree to our
					</Text>
					<View style={styles.policyAndTermsTextWrapper}>
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
				<FormButton
					length="full"
					theme="dark"
					title="Sign Up"
					onPress={handleSubmit}
				/>
				<View style={styles.loginTextWrapper}>
					<Text style={[styles.loginText, styles.loginTextBlack]}>
						Already have an account?
					</Text>
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
