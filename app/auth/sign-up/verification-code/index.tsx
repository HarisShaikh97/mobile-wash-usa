import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import AccountVerificationSuccessfulModal from "../../../../components/account-verification-successful-modal/AccountVerificationSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("") // State to store the OTP input by the user
	const [openModal, setOpenModal] = useState<boolean>(false) // State to manage the modal visibility

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		setOpenModal(true) // Opens the modal on form submission
	}, [setOpenModal])

	return (
		<View style={styles.bodyContainer}>
			{/* Modal for account verification success */}
			<AccountVerificationSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="app"
			/>
			{/* Title text for verification */}
			<Text style={styles.titleText}>Verify Your Account</Text>
			{/* Description text for verification */}
			<Text style={styles.descriptionText}>
				A verification code has been sent to your email/phone.
			</Text>
			{/* Container for the verification form */}
			<View style={styles.formContainer}>
				{/* OTP input field */}
				<OTPInput onChangeText={setOTP} />
				{/* Container for policy and terms text */}
				<View style={styles.policyAndTermsTextContainer}>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsTextBlack
						]}
					>
						By verifying your account, you agree to
					</Text>
					{/* Wrapper for policy and terms links */}
					<View style={styles.policyAndTermsTextWrapper}>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsTextBlack
							]}
						>
							{"our "}
						</Text>
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
				{/* Form button for verification */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Verify Account"
					onPress={handleSubmit}
				/>
			</View>
			{/* Wrapper for resend code text */}
			<View style={styles.policyAndTermsTextWrapper}>
				<Text
					style={[styles.policyAndTermsText, styles.resendCodeText]}
				>
					Don’t receive code ?
				</Text>
				<TouchableOpacity>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsLinkText
						]}
					>
						{"	Re-send"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 25,
		gap: 10,
		zIndex: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 200,
		lineHeight: 32.5
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 16.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 250,
		paddingTop: 7.5,
		lineHeight: 20
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		paddingTop: 10,
		paddingHorizontal: 20
	},
	policyAndTermsTextContainer: {
		width: "100%",
		flexDirection: "column",
		paddingTop: 15
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
	resendCodeText: {
		color: theme.colors.secondary,
		fontFamily: "Roboto-Medium"
	}
})
