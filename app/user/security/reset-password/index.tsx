import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { showToastable } from "react-native-toastable"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { resetPassword } from "../../../../helpers/profile"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	const [oldPassword, setOldPassword] = useState<string>("") //State for storing old password
	const [newPassword, setNewPassword] = useState<string>("") //State for storing new password
	const [confirmPassword, setConfirmPassword] = useState<string>("") //State for storing confirm password
	const [openModal, setOpenModal] = useState<boolean>(false) //State for managing modal visibility

	// Memoized function to handle password reset success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Show the success modal
			setOpenModal(true)
		},
		[setOpenModal]
	)

	// Memoized function to handle password reset error
	const handleError = useCallback(
		(error: any): void => {
			console.log(error)

			// Show error toast message
			showToastable({
				message:
					error?.response?.data?.errors?.messages[0] ||
					"Something went wrong!",
				status: "danger"
			})
		},
		[showToastable]
	)

	// Mutation hook to handle password reset
	const { mutate, isPending } = useMutation({
		mutationFn: resetPassword,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized callback for handling form submission
	const handleSubmit = useCallback((): void => {
		// Check if the new password and confirmation match
		if (newPassword === confirmPassword) {
			// Mutate the resetPassword function with the old password, new password, and access token
			mutate({
				oldPassword: oldPassword,
				newPassword: newPassword,
				accessToken: token
			})
		} else {
			// Show error toast message
			showToastable({
				message: "Passwords do not match!",
				status: "danger"
			})
		}
	}, [mutate, oldPassword, newPassword, confirmPassword, token])

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
					isLoading={isPending}
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
