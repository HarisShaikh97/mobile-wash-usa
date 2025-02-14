import React from "react"
import { View, StyleSheet } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface OTPInputProps {
	onChangeText: (text: string) => void
}

export default function OTPInput({
	onChangeText
}: OTPInputProps): React.ReactElement | null {
	return (
		// Wrapper for the OTP input component
		<View style={styles.otpInputWrapper}>
			{/* OTP input component */}
			<OtpInput
				numberOfDigits={6}
				theme={{
					pinCodeContainerStyle: styles.pinCodeContainer,
					pinCodeTextStyle: styles.pinCodeText,
					focusedPinCodeContainerStyle: styles.activePinCodeContainer,
					focusStickStyle: styles.focusStick
				}}
				autoFocus={false}
				onTextChange={onChangeText}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	otpInputWrapper: {
		width: "100%",
		marginTop: 15
	},
	pinCodeContainer: {
		height: 45,
		width: 45,
		borderRadius: 10,
		borderWidth: 1.5,
		borderColor: "#E1E1E1",
		backgroundColor: "white"
	},
	activePinCodeContainer: {
		borderWidth: 2,
		borderColor: theme.colors.primary
	},
	pinCodeText: {
		fontSize: 15,
		fontWeight: "600",
		color: theme.colors.secondary
	},
	focusStick: {
		height: 15,
		backgroundColor: theme.colors.primary
	}
})
