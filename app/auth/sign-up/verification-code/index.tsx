import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import AccountVerificationSuccessfulModal from "../../../../components/account-verification-successful-modal/AccountVerificationSuccessfulModal"
import {
	verifyRegistration,
	resendAccountVerificationOTP
} from "../../../../helpers/auth"
import { deleteVerificationEmail } from "../../../../features/email-verification/emailVerificationSlice"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	const [OTP, setOTP] = useState<string>("") // State to store the OTP input by the user
	const [openModal, setOpenModal] = useState<boolean>(false) // State to manage the modal visibility

	// Retrieve email from Redux store
	const email = useSelector(
		(state: RootState) => state.emailVerification.email
	)

	// Memoized function to handle account verification success
	const handleVerificationSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Dispatch action to delete verification email
			dispatch(deleteVerificationEmail())

			setOpenModal(true) // Opens the modal on form submission
		},
		[setOpenModal, dispatch, deleteVerificationEmail]
	)

	// Memoized function to handle account verification error
	const handleVerificationError = useCallback(
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

	// Memoized function to handle resend account verification OTP success
	const handleResendOTPSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Show success toast message
			showToastable({
				message:
					"OTP has been resent to your email. Please check your email.",
				status: "success"
			})
		},
		[showToastable]
	)

	// Memoized function to handle resend account verification OTP error
	const handleResendOTPError = useCallback(
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

	// Mutation hook to handle account verification
	const { mutate: verify, isPending: isVerificationPending } = useMutation({
		mutationFn: verifyRegistration,
		onSuccess: handleVerificationSuccess,
		onError: handleVerificationError
	})

	// Mutation hook to handle resend account verification OTP
	const { mutate: resendOTP } = useMutation({
		mutationFn: resendAccountVerificationOTP,
		onSuccess: handleResendOTPSuccess,
		onError: handleResendOTPError
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Mutate the account verification function with the user's email and OTP
		verify({ email: email, otp: OTP })
	}, [verify, email, OTP])

	// Memoized function to handle resend OTP
	const handleResendOTP = useCallback((): void => {
		// Mutate the resend OTP function with the user's email
		resendOTP({ email: email })
	}, [resendOTP, email])

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
					isLoading={isVerificationPending}
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
				<TouchableOpacity onPress={handleResendOTP}>
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
