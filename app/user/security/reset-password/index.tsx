import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [oldPassword, setOldPassword] = useState<string>("") //State for storing old password
	const [newPassword, setNewPassword] = useState<string>("") //State for storing new password
	const [confirmPassword, setConfirmPassword] = useState<string>("") //State for storing confirm password
	const [openModal, setOpenModal] = useState<boolean>(false) //State for managing modal visibility

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		setOpenModal(true) // Open the modal
	}, [setOpenModal])

	// Memoized function to handle modal submission
	const modalHandleSubmit = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.back() // Navigate back to the previous page
	}, [setOpenModal, router])

	return (
		<View style={styles.bodyContainer}>
			{/* Modal component for successful password reset */}
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				formButtonTitle="Next"
				handleSubmit={modalHandleSubmit}
				mode="app"
			/>
			{/* Page title */}
			<Text style={styles.titleText}>Reset Password</Text>
			{/* Description text explaining the purpose */}
			<Text style={styles.descriptionText}>
				Change your password below to keep your account secure.
			</Text>
			{/* Form container with input fields */}
			<View style={styles.formContainer}>
				{/* Input field for old password */}
				<InputField
					length="full"
					title="Old Password"
					placeholder="Enter your old password"
					value={oldPassword}
					onChangeText={setOldPassword}
					secureTextEntry={true}
					multiline={false}
					type="text"
				/>
				{/* Input field for new password */}
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
				{/* Input field for confirming new password */}
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
				{/* Submit button to reset password */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
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
		paddingHorizontal: 15,
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
