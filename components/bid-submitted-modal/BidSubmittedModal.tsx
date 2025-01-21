import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface BidSubmittedModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function BidSubmittedModal({
	openModal,
	setOpenModal,
	mode
}: BidSubmittedModalProps): React.ReactElement | null {
	const router = useRouter()

	const handleGoToDashboard = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/vendor/home")
	}, [openModal, router])

	const handleViewMoreJobs = useCallback((): void => {
		setOpenModal(false)
		router.replace("/vendor/available-jobs")
	}, [openModal, router])

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
						/>
						<View style={styles.modalBodyContainer}>
							<Text style={styles.titleText}>Bid Submitted!</Text>
							<Text style={styles.descriptionText}>
								Your bid for Car Wash Service Needed has been
								sent successfully. The customer will review your
								offer and respond soon. Stay tuned for updates!
							</Text>
						</View>
						<View style={styles.formButtonsWrapper}>
							<FormButton
								length="half"
								colorTheme="light"
								isLoading={false}
								title="Go to Dashboard"
								onPress={handleGoToDashboard}
							/>
							<FormButton
								length="half"
								colorTheme="dark"
								isLoading={false}
								title="View More Jobs"
								onPress={handleViewMoreJobs}
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
		backgroundColor: "white"
	},
	modalContainerApp: {
		height: 450,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	modalContainerWeb: {
		width: 400,
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
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	}
})
