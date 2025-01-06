import { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import JobCompletionSuccessfulModal from "../../../../components/job-completion-successful-modal/JobCompletionSuccessfulModal"
import InvalidOTPModal from "../../../../components/invalid-otp-modal/InvalidOTPModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("")
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
	const [openInvalidModal, setOpenInvalidModal] = useState<boolean>(false)

	const handleSubmit = useCallback((): void => {
		setOpenInvalidModal(true)
	}, [setOpenSuccessModal, setOpenInvalidModal])

	return (
		<View style={styles.bodyContainer}>
			<JobCompletionSuccessfulModal
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
				mode="app"
			/>
			<InvalidOTPModal
				openModal={openInvalidModal}
				setOpenModal={setOpenInvalidModal}
				mode="app"
			/>
			<Text style={styles.titleText}>Job Completion Verification</Text>
			<Text style={[styles.descriptionText, styles.descriptionTextLarge]}>
				Please enter the OTP code provided by the customer to confirm
				the completion of the job.
			</Text>
			<View style={styles.formContainer}>
				<OTPInput onChangeText={setOTP} />
				<FormButton
					length="full"
					theme="dark"
					title="Submit"
					onPress={handleSubmit}
				/>
			</View>
			<Text style={[styles.descriptionText, styles.descriptionTextSmall]}>
				Once you enter the correct OTP, the job will be marked as
				complete, and payment will be processed if applicable.
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 25,
		gap: 25
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 265,
		lineHeight: 32.5
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 20
	},
	descriptionTextLarge: {
		fontSize: 16.5,
		width: 265
	},
	descriptionTextSmall: {
		fontSize: 15,
		width: 325
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingHorizontal: 20
	}
})
