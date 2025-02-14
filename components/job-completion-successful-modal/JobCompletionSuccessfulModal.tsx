import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface JobCompletionSuccessfulModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function JobCompletionSuccessfulModal({
	openModal,
	setOpenModal,
	mode
}: JobCompletionSuccessfulModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the form submission
	const handleSubmit = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.navigate("/vendor/home") // Navigate to the home page
	}, [setOpenModal, router])

	return (
		// Modal component for displaying job completion success message
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Outer wrapper with background overlay */}
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
					{/* Background image wrapper */}
					<ImageBackground
						source={require("../../assets/images/modal-background.png")}
						style={[
							styles.backgroundImage,
							mode === "app"
								? styles.backgroundImageApp
								: styles.backgroundImageWeb
						]}
						contentFit="fill"
					>
						{/* Success icon */}
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
							contentFit="contain"
						/>
						{/* Modal content container */}
						<View style={styles.modalBodyContainer}>
							{/* Success title */}
							<Text style={styles.titleText}>
								Job Completed Successfully!
							</Text>
							{/* Success description */}
							<Text style={styles.descriptionText}>
								Thank you! The OTP was verified, and the job has
								been marked as complete.
							</Text>
						</View>
						{/* Button container */}
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="full"
								colorTheme="dark"
								isLoading={false}
								title="Okay"
								onPress={handleSubmit}
							/>
						</View>
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
		height: 425,
		backgroundColor: "white"
	},
	modalContainerApp: {
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	modalContainerWeb: {
		width: 365,
		borderRadius: 35
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingVertical: 50,
		paddingHorizontal: 35
	},
	backgroundImageApp: {
		gap: 20
	},
	backgroundImageWeb: {
		gap: 15
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
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		paddingTop: 5,
		textTransform: "capitalize"
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		width: 250,
		textAlign: "center",
		textTransform: "capitalize"
	},
	formButtonsWrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-end"
	}
})
