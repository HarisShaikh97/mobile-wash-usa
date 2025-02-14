import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface InvalidOTPModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function InvalidOTPModal({
	openModal,
	setOpenModal,
	mode
}: InvalidOTPModalProps): React.ReactElement | null {
	// Modal callback function to handle the "Retry" action
	const handleRetry = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	return (
		// Modal component for displaying invalid OTP message
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Main modal wrapper with background overlay */}
			<View
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				{/* Container for modal content */}
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
						{/* Invalid OTP icon */}
						<Image
							source={require("../../assets/icons/invalid.svg")}
							style={styles.invalidIcon}
							alt="icon"
							contentFit="contain"
						/>
						{/* Modal content container */}
						<View style={styles.modalBodyContainer}>
							<Text style={styles.titleText}>Invalid OTP</Text>
							<Text style={styles.descriptionText}>
								The OTP you entered is incorrect. Please try
								again.
							</Text>
						</View>
						{/* Retry button container */}
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="full"
								colorTheme="black"
								isLoading={false}
								title="Retry"
								onPress={handleRetry}
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
		paddingVertical: 50
	},
	backgroundImageApp: {
		gap: 20,
		paddingHorizontal: 35
	},
	backgroundImageWeb: {
		gap: 15,
		paddingHorizontal: 50
	},
	invalidIcon: {
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
		color: theme.colors.secondary,
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
