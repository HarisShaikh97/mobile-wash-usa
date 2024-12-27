import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [newPassword, setNewPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const handleSubmit = useCallback((): void => {
		setOpenModal(true)
	}, [openModal])

	const modalHandleSubmit = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/auth/login")
	}, [openModal, router])

	return (
		<View style={styles.bodyContainer}>
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				formButtonTitle="Login"
				handleSubmit={modalHandleSubmit}
				mode="web"
			/>
			<Text style={styles.titleText}>Change Password</Text>
			<Text style={styles.descriptionText}>
				Create a new password below to access your account.
			</Text>
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
				<View style={styles.formButtonWrapper}>
					<FormButton
						length="full"
						theme="dark"
						title="Reset Password"
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center"
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 37.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Light",
		fontSize: 18.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 250,
		paddingTop: 7.5
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingTop: 35
	},
	formButtonWrapper: {
		marginTop: 15,
		width: "65%"
	}
})
