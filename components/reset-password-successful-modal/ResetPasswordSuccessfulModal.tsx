import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ResetPasswordModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	formButtonTitle: string
	handleSubmit: () => void
	mode: "web" | "app"
}

export default function ResetPasswordSuccessfulModal({
	openModal,
	setOpenModal,
	formButtonTitle,
	handleSubmit,
	mode
}: ResetPasswordModalProps): React.ReactElement | null {
	return (
		// Modal component for displaying password reset success message
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
						{/* Success icon */}
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
							contentFit="contain"
						/>
						{/* Container for success message text */}
						<View style={styles.modalBodyContainer}>
							<Text style={styles.descriptionText}>
								Your Password Has Been
							</Text>
							<Text style={styles.titleText}>
								Successfully Reset!
							</Text>
							<Text style={styles.descriptionText}>
								You Can Now Log In With Your New Password
							</Text>
						</View>
						{/* Action button */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title={formButtonTitle}
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
		width: 385,
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
		textTransform: "capitalize",
		paddingTop: 5
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		width: 250,
		textTransform: "capitalize",
		textAlign: "center"
	}
})
