import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get the router instance for navigation
	const router = useRouter()

	// State variables to store the new password, confirm password, and modal state
	const [newPassword, setNewPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Set the modal state to true to open the modal
		setOpenModal(true)
	}, [openModal])

	// Function to handle modal submission
	const modalHandleSubmit = useCallback((): void => {
		// Set the modal state to false to close the modal
		setOpenModal(false)
		// Navigate to the login page
		router.navigate("/auth/login")
	}, [openModal, router])

	return (
		<View style={styles.bodyContainer}>
			{/* Render the success modal */}
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				formButtonTitle="Login"
				handleSubmit={modalHandleSubmit}
				mode="web"
			/>
			{/* Page title */}
			<Text style={styles.titleText}>Change Password</Text>
			{/* Page description */}
			<Text style={styles.descriptionText}>
				Create a new password below to access your account.
			</Text>
			{/* Form container */}
			<View style={styles.formContainer}>
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
				{/* Input field for confirm password */}
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
					{/* Form button to submit the form */}
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
