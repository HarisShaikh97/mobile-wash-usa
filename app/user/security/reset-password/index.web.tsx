import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import ResetPasswordSuccessfulModal from "../../../../components/reset-password-successful-modal/ResetPasswordSuccessfulModal"
import BackButton from "../../../../components/back-button/BackButton"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [oldPassword, setOldPassword] = useState<string>("") // State for storing old password
	const [newPassword, setNewPassword] = useState<string>("") // State for storing new password
	const [confirmPassword, setConfirmPassword] = useState<string>("") // State for storing confirm password
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility

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
		// Main container with background image
		<ImageBackground
			source={require("../../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* Modal component for successful password reset */}
			<ResetPasswordSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				formButtonTitle="Next"
				handleSubmit={modalHandleSubmit}
				mode="web"
			/>
			{/* Navigation back button */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Card container for the form */}
				<View style={styles.cardContainer}>
					{/* Title and description section */}
					<Text style={styles.titleText}>Reset Password</Text>
					<Text style={styles.descriptionText}>
						Change your password below to keep your account secure.
					</Text>
					{/* Form inputs container */}
					<View style={styles.formContainer}>
						{/* Old password input field */}
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
						{/* New password input field */}
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
						{/* Confirm password input field */}
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
					</View>
					{/* Submit button container */}
					<View style={styles.formButtonWrapper}>
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Reset Password"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		flexDirection: "column",
		padding: 35
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 550,
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 35,
		paddingHorizontal: 75,
		backgroundColor: "white",
		borderRadius: 27.5
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 42.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Light",
		fontSize: 18.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 325,
		paddingTop: 7.5,
		letterSpacing: 0.5
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingVertical: 50
	},
	formButtonWrapper: {
		width: "75%"
	}
})
