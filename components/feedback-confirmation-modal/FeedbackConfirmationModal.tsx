import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"

// Interface for the props of the component
interface FeedbackConfirmationModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function FeedbackConfirmationModal({
	openModal,
	setOpenModal,
	mode
}: FeedbackConfirmationModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the "Close" action
	const handleSubmit = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.navigate("/user/home") // Navigate to the home page
	}, [setOpenModal, router])

	return (
		// Modal component for displaying feedback confirmation
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
						style={styles.backgroundImage}
						contentFit="fill"
					>
						{/* Star icon at the top */}
						<Image
							source={require("../../assets/icons/star.svg")}
							style={styles.starIcon}
							alt="icon"
							contentFit="contain"
						/>
						{/* Container for the thank you message */}
						<View style={styles.modalBodyContainer}>
							<Text style={styles.titleText}>
								Thank you for your feedback!
							</Text>
						</View>
						{/* Container for the close button */}
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="full"
								colorTheme="gray"
								isLoading={false}
								title="Close"
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
		alignItems: "center",
		justifyContent: "center"
	},
	modalContainer: {
		height: 375,
		backgroundColor: "white"
	},
	modalContainerApp: {
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	modalContainerWeb: {
		borderRadius: 35,
		width: 375
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingVertical: 50,
		paddingHorizontal: 35
	},
	starIcon: {
		height: 100,
		width: 100
	},
	modalBodyContainer: {
		flexDirection: "column",
		alignItems: "center"
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: "#FBBA1D",
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
