import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

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
						style={styles.backgroundImage}
						contentFit="fill"
					>
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
							contentFit="contain"
						/>
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
