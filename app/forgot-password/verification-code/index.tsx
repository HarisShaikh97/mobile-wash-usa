import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import FormButton from "../../../components/form-button/FormButton"
import OTPInput from "../../../components/otp-input/OTPInput"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleSubmit = useCallback((): void => {}, [])

	return (
		<View style={styles.bodyContainer}>
			{fontsLoaded && (
				<Text style={styles.titleText}>
					Enter The Verification Code
				</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					A 5-digit code has been sent to your email/phone. Please
					enter the code below to reset your password.
				</Text>
			)}
			<View style={styles.formContainer}>
				<OTPInput onChangeText={setOTP} />
				<View style={styles.policyAndTermsTextContainer}>
					{fontsLoaded && (
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsTextBlack
							]}
						>
							By verifying your account, you agree to
						</Text>
					)}
					<View style={styles.policyAndTermsTextWrapper}>
						{fontsLoaded && (
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsTextBlack
								]}
							>
								{"our "}
							</Text>
						)}
						<TouchableOpacity>
							{fontsLoaded && (
								<Text
									style={[
										styles.policyAndTermsText,
										styles.policyAndTermsLinkText
									]}
								>
									Terms of Service
								</Text>
							)}
						</TouchableOpacity>
						{fontsLoaded && (
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsTextBlack
								]}
							>
								{" and "}
							</Text>
						)}
						<TouchableOpacity>
							{fontsLoaded && (
								<Text
									style={[
										styles.policyAndTermsText,
										styles.policyAndTermsLinkText
									]}
								>
									Privacy Policy
								</Text>
							)}
						</TouchableOpacity>
						{fontsLoaded && (
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsTextBlack
								]}
							>
								.
							</Text>
						)}
					</View>
				</View>
				<FormButton title="Verify Code" onPress={handleSubmit} />
			</View>
			<View style={styles.policyAndTermsTextWrapper}>
				{fontsLoaded && (
					<Text
						style={[
							styles.policyAndTermsText,
							styles.resendCodeText
						]}
					>
						Don’t receive code ?
					</Text>
				)}
				<TouchableOpacity>
					{fontsLoaded && (
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsLinkText
							]}
						>
							{"	Re-send"}
						</Text>
					)}
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
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center"
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
