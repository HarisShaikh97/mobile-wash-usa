import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface ResetPasswordModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
}

export default function ResetPasswordSuccessfulModal({
	openModal,
	setOpenModal
}: ResetPasswordModalProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSubmit = useCallback((): void => {
		setOpenModal(!openModal)
		router.navigate("/login")
	}, [openModal])

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
						contentFit="cover"
					>
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
						/>
						<View style={styles.modalBodyContainer}>
							{fontsLoaded && (
								<Text style={styles.descriptionText}>
									Your Password Has Been
								</Text>
							)}
							{fontsLoaded && (
								<Text style={styles.titleText}>
									Successfully Reset!
								</Text>
							)}
							{fontsLoaded && (
								<Text style={styles.descriptionText}>
									You Can Now Log In With Our New Password
								</Text>
							)}
						</View>
						<FormButton title="Login" onPress={handleSubmit} />
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
		height: 450,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
		backgroundColor: "white"
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
