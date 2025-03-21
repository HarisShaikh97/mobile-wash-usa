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

	const [oldPassword, setOldPassword] = useState<string>("") // State for storing the old password
	const [newPassword, setNewPassword] = useState<string>("") // State for storing the new password
	const [confirmPassword, setConfirmPassword] = useState<string>("") // State for storing the confirmation of the new password
	const [openModal, setOpenModal] = useState<boolean>(false) // State for controlling the visibility of the modal

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

	// Memoized callback for handling modal submission
	const modalHandleSubmit = useCallback((): void => {
		setOpenModal(false) // Hide the modal
		router.back() // Navigate back
	}, [setOpenModal, router])

	return (
		<View style={styles.bodyContainer}>
			{/* Modal component for displaying success message after password reset */}
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				formButtonTitle="Next"
				handleSubmit={modalHandleSubmit}
				mode="app"
			/>
			{/* Main title of the password reset screen */}
			<Text style={styles.titleText}>Reset Password</Text>
			{/* Description text explaining the purpose */}
			<Text style={styles.descriptionText}>
				Change your password below to keep your account secure.
			</Text>
			{/* Container for the password reset form */}
			<View style={styles.formContainer}>
				{/* Input field for entering the old password */}
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
				{/* Input field for entering the new password */}
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
				{/* Input field for confirming the new password */}
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
				{/* Submit button to trigger password reset */}
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
