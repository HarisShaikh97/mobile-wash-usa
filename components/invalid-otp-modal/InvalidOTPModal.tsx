import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

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
	const handleSubmit = useCallback((): void => {
		setOpenModal(false)
	}, [openModal])

	return (
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			<View
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
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
						<Image
							source={require("../../assets/icons/invalid.svg")}
							style={styles.invalidIcon}
							alt="icon"
							contentFit="contain"
						/>
						<View style={styles.modalBodyContainer}>
							<Text style={styles.titleText}>Invalid OTP</Text>
							<Text style={styles.descriptionText}>
								The OTP you entered is incorrect. Please try
								again.
							</Text>
						</View>
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="full"
								theme="black"
								title="Retry"
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
