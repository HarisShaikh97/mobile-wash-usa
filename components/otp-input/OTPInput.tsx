import React from "react"
import { View, StyleSheet } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { theme } from "../../utils/constants"

interface OTPInputProps {
	onChangeText: (text: string) => void
}

export default function OTPInput({
	onChangeText
}: OTPInputProps): React.ReactElement | null {
	return (
		<View style={styles.otpInputWrapper}>
			<OtpInput
				numberOfDigits={5}
				theme={{
					pinCodeContainerStyle: styles.pinCodeContainer,
					pinCodeTextStyle: styles.pinCodeText,
					focusedPinCodeContainerStyle: styles.activePinCodeContainer,
					focusStickStyle: styles.focusStick
				}}
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
		borderRadius: 12.5,
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
		height: 17.5,
		backgroundColor: theme.colors.primary
	}
})
