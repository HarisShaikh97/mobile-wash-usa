import { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import JobCompletionSuccessfulModal from "../../../../components/job-completion-successful-modal/JobCompletionSuccessfulModal"
import InvalidOTPModal from "../../../../components/invalid-otp-modal/InvalidOTPModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("") // State for OTP input
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false) // State for managing success modal visibility
	const [openInvalidModal, setOpenInvalidModal] = useState<boolean>(false) // State for managing invalid OTP modal visibility

	// Memoized callback for handling successful completion
	const handleSubmit = useCallback((): void => {
		setOpenSuccessModal(true) // Show success modal
	}, [setOpenSuccessModal, setOpenInvalidModal])

	return (
		// Main container for the job completion verification screen
		<View style={styles.bodyContainer}>
			{/* Modal for displaying successful job completion message */}
			<JobCompletionSuccessfulModal
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
				mode="web"
			/>
			{/* Modal for displaying invalid OTP error message */}
			<InvalidOTPModal
				openModal={openInvalidModal}
				setOpenModal={setOpenInvalidModal}
				mode="web"
			/>
			{/* Main title of the verification page */}
			<Text style={styles.titleText}>Job Completion Verification</Text>
			{/* Instructions for entering OTP */}
			<Text style={[styles.descriptionText, styles.descriptionTextLarge]}>
				Please enter the OTP code provided by the customer to confirm
				the completion of the job.
			</Text>
			{/* Container for OTP input and submit button */}
			<View style={styles.formContainer}>
				{/* OTP input component */}
				<OTPInput onChangeText={setOTP} />
				{/* Submit button for OTP verification */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Submit"
					onPress={handleSubmit}
				/>
			</View>
			{/* Additional information about completion process */}
			<Text style={[styles.descriptionText, styles.descriptionTextSmall]}>
				Once you enter the correct OTP, the job will be marked as
				complete, and payment will be processed if applicable.
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 40,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 335,
		lineHeight: 45
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		letterSpacing: 0.5
	},
	descriptionTextLarge: {
		fontSize: 18.5,
		width: 315
	},
	descriptionTextSmall: {
		fontSize: 16.5,
		width: 365
	},
	formContainer: {
		width: 300,
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		marginVertical: 15
	}
})
