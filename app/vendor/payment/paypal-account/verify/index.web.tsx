import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FormButton from "../../../../../components/form-button/FormButton"
import OTPInput from "../../../../../components/otp-input/OTPInput"
import PayPalAccountStatusModal from "../../../../../components/paypal-account-status-modal/PayPalAccountStatusModal"
import { theme } from "../../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [status, setStatus] = useState<"success" | "invalid">("success")

	const handleSubmit = useCallback((): void => {
		setStatus("success")
		setOpenModal(true)
	}, [setOpenModal, setStatus])

	return (
		<View style={styles.bodyContainer}>
			<PayPalAccountStatusModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				status={status}
			/>
			<View style={styles.titleWrapper}>
				<Text style={styles.titleText}>
					Confirm Your PayPal Account
				</Text>
				<Text style={styles.descriptionText}>
					We’ve sent a confirmation code to your PayPal email. Please
					check your inbox and enter the code below to verify your
					account.
				</Text>
			</View>
			<View style={styles.formContainer}>
				<OTPInput onChangeText={setOTP} />
				<FormButton
					length="full"
					theme="dark"
					title="Verify Code"
					onPress={handleSubmit}
				/>
				<View style={styles.policyAndTermsTextWrapper}>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.resendCodeText
						]}
					>
						Don’t receive code?
					</Text>
					<TouchableOpacity>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsLinkText
							]}
						>
							{"Re-send"}
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
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 7.5
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 40,
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 37.5,
		textTransform: "capitalize"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 17.5,
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 25,
		width: 385
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15,
		paddingTop: 10,
		paddingHorizontal: 50
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
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
