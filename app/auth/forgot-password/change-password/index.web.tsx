import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import { setNewPassword } from "../../../../helpers/auth"
import { deleteAccessToken } from "../../../../features/reset-password/resetPasswordSlice"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve access token from Redux store
	const accessToken = useSelector(
		(state: RootState) => state.resetPassword.accessToken
	)

	// State variables to store the new password, confirm password, and modal state
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	// Memoized function to handle set new password success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Dispatch action to delete access token
			dispatch(deleteAccessToken())

			// Set the modal state to true to open the modal
			setOpenModal(true)
		},
		[dispatch, deleteAccessToken, setOpenModal]
	)

	// Memoized function to handle set new password error
	const handleError = useCallback(
		(error: any): void => {
			console.log(error)

			// Show error toast message
			showToastable({
				message:
					error?.response?.data?.errors?.fields?.password[0] ||
					"Something went wrong!",
				status: "danger"
			})
		},
		[showToastable]
	)

	// Mutation hook to handle set new password
	const { mutate, isPending } = useMutation({
		mutationFn: setNewPassword,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Check if the passwords match
		if (password === confirmPassword) {
			// Mutate the set new password function with the access token and password
			mutate({ accessToken: accessToken, password: password })
		} else {
			// Show error toast message
			showToastable({
				message:
					"Passwords do not match! Please make sure they match and try again.",
				status: "danger"
			})
		}
	}, [mutate, accessToken, password, confirmPassword, showToastable])

	// Function to handle modal submission
	const modalHandleSubmit = useCallback((): void => {
		// Set the modal state to false to close the modal
		setOpenModal(false)
		// Navigate to the login page
		router.navigate("/auth/login")
	}, [openModal, router, setOpenModal])

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
					value={password}
					onChangeText={setPassword}
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
						colorTheme="dark"
						isLoading={isPending}
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
