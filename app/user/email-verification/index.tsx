import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useSelector, useDispatch } from "react-redux"
import { showToastable } from "react-native-toastable"
import FormButton from "../../../components/form-button/FormButton"
import OTPInput from "../../../components/otp-input/OTPInput"
import {
	verifyUpdateProfile,
	resendUpdateProfileVerificationOTP
} from "../../../helpers/profile"
import { updateUserDetails } from "../../../features/auth/authSlice"
import { RootState } from "../../../store/store"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// State to manage the OTP input
	const [OTP, setOTP] = useState<string>("")

	// Memoized function to handle profile update success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Show success toast message
			showToastable({
				message: "Profile updated successfully!",
				status: "success"
			})

			// Get the user's information
			const user = data?.data?.user

			// Check if the user is defined
			if (user) {
				// Update the user's information in the Redux store
				dispatch(
					updateUserDetails({
						user: user
					})
				)
			}

			router.navigate("/user/home/profile") // Navigating to the profile page on success
		},
		[router, dispatch, updateUserDetails, showToastable]
	)

	// Memoized function to handle profile update error
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

	// Mutation hook to handle verification of the profile update
	const { mutate: verify, isPending: isVerifying } = useMutation({
		mutationFn: verifyUpdateProfile,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Mutation hook to handle resend update profile verification OTP
	const { mutate: resendOTP } = useMutation({
		mutationFn: resendUpdateProfileVerificationOTP,
		onSuccess: handleResendOTPSuccess,
		onError: handleResendOTPError
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Mutate the updateProfile function with the form data and access token
		verify({ otp: OTP, accessToken: token })
	}, [OTP, token, verify])

	// Memoized function to handle resend OTP
	const handleResendOTP = useCallback((): void => {
		// Mutate the resend OTP function with the user's access token
		resendOTP(token)
	}, [resendOTP, token])

	return (
		// Container for the verification code input
		<View style={styles.bodyContainer}>
			{/* Displaying the title for the verification code input */}
			<Text style={styles.titleText}>Enter the Verification Code</Text>
			{/* Providing a description for the verification process */}
			<Text style={styles.descriptionText}>
				A 6-digit code has been sent to your email. Please enter the
				code below to Change your email.
			</Text>
			{/* Container for the form fields and buttons */}
			<View style={styles.formContainer}>
				{/* OTP input field for user input */}
				<OTPInput onChangeText={setOTP} />
				{/* Button to submit the verification code */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={isVerifying}
					title="Verify Code"
					onPress={handleSubmit}
				/>
				{/* Container for the resend code text and link */}
				<View style={styles.policyAndTermsTextWrapper}>
					{/* Text indicating the option to resend the code */}
					<Text
						style={[
							styles.policyAndTermsText,
							styles.resendCodeText
						]}
					>
						Don’t receive code ?
					</Text>
					{/* Touchable area for the resend code link */}
					<TouchableOpacity onPress={handleResendOTP}>
						{/* Link to resend the verification code */}
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
		lineHeight: 32.5
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 16.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 285,
		paddingTop: 7.5,
		lineHeight: 20
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingTop: 10
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	policyAndTermsText: {
		fontSize: 13.5
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
