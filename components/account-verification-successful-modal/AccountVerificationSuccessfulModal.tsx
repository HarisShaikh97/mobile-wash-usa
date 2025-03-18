import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface AccountVerificationModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "web" | "app"
}

export default function AccountVerificationSuccessfulModal({
	openModal,
	setOpenModal,
	mode
}: AccountVerificationModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Callback function for the form button
	const handleSubmit = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.navigate("/auth/login") // Navigate to the login page
	}, [setOpenModal, router])

	return (
		// Modal component for account verification success message
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Outer wrapper for modal with background overlay */}
			<View
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				{/* Inner container for modal content */}
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					{/* Background image for the modal */}
					<ImageBackground
						source={require("../../assets/images/modal-background.png")}
						style={styles.backgroundImage}
						contentFit="fill"
					>
						{/* Success icon */}
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
						/>
						{/* Container for text content */}
						<View style={styles.modalBodyContainer}>
							<Text style={styles.descriptionText}>
								Your Account Has Been
							</Text>
							<Text style={styles.titleText}>
								Successfully Verified!
							</Text>
							<Text style={styles.descriptionText}>
								You Can Now Log In And Start Using The Platform
							</Text>
						</View>
						{/* Login button */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Login"
							onPress={handleSubmit}
						/>
					</ImageBackground>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalWrapperApp: {
		justifyContent: "flex-end"
	},
	modalWrapperWeb: {
		justifyContent: "center",
		alignItems: "center"
	},
	modalContainer: {
		height: 450,
		backgroundColor: "white"
	},
	modalContainerApp: {
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	modalContainerWeb: {
		borderRadius: 35
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 30,
		paddingTop: 50,
		paddingHorizontal: 50
	},
	successfulIcon: {
		height: 100,
		width: 100
	},
	modalBodyContainer: {
		flexDirection: "column",
		alignItems: "center"
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Montserrat-Medium",
		color: theme.colors.secondary,
		width: 250,
		textAlign: "center",
		paddingTop: 5
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		width: 250,
		textAlign: "center"
	}
})
