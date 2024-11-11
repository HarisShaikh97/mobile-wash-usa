import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [newPassword, setNewPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSubmit = useCallback((): void => {
		setOpenModal(!openModal)
	}, [openModal])

	return (
		<View style={styles.bodyContainer}>
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
			{fontsLoaded && (
				<Text style={styles.titleText}>Change Password</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					Create a new password below to access your account.
				</Text>
			)}
			<View style={styles.formContainer}>
				<InputField
					length="full"
					title="New Password"
					placeholder="Enter your new password"
					value={newPassword}
					onChangeText={setNewPassword}
					secureTextEntry={true}
					multiline={false}
					type="text"
				/>
				<InputField
					length="full"
					title="Confirm Password"
					placeholder="Re-enter your new password"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry={true}
					multiline={false}
					type="text"
				/>
				<FormButton
					length="full"
					theme="dark"
					title="Reset Password"
					onPress={handleSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35,
		gap: 2.5
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 22.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 13.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 200,
		paddingTop: 7.5,
		lineHeight: 15
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15,
		paddingTop: 35
	}
})
