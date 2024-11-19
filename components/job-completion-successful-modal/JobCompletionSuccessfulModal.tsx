import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface JobCompletionSuccessfulModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
}

export default function JobCompletionSuccessfulModal({
	openModal,
	setOpenModal
}: JobCompletionSuccessfulModalProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSubmit = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/vendor/home")
	}, [openModal, router])

	return (
		<Modal
			animationType="slide"
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			<View style={styles.modalWrapper}>
				<View style={styles.modalContainer}>
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
							{fontsLoaded && (
								<Text style={styles.titleText}>
									Job Completed Successfully!
								</Text>
							)}
							{fontsLoaded && (
								<Text style={styles.descriptionText}>
									Thank you! The OTP was verified, and the job
									has been marked as complete.
								</Text>
							)}
						</View>
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="full"
								theme="dark"
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
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalContainer: {
		height: 425,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
		backgroundColor: "white"
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingVertical: 50,
		paddingHorizontal: 35
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
		textAlign: "center",
		paddingTop: 5,
		textTransform: "capitalize"
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		width: 250,
		textAlign: "center"
	},
	formButtonsWrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-end"
	}
})
