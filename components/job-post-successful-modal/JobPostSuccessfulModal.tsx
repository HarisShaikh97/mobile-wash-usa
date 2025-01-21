import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface JobPostModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function JobPostSuccessfulModal({
	openModal,
	setOpenModal,
	mode
}: JobPostModalProps): React.ReactElement | null {
	const router = useRouter()

	const handleGoToDashboard = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/user/home")
	}, [openModal, router])

	const handlePostAnotherJob = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/user/add-job")
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
						style={[
							styles.backgroundImage,
							mode === "app"
								? styles.backgroundImageApp
								: styles.backgroundImageWeb
						]}
						contentFit="fill"
					>
						<Image
							source={require("../../assets/icons/successful.svg")}
							style={styles.successfulIcon}
							alt="icon"
							contentFit="contain"
						/>
						<View style={styles.modalBodyContainer}>
							<Text style={styles.titleText}>
								Job Posted Successfully!
							</Text>
							<Text style={styles.descriptionText}>
								Your job has been posted, and nearby vendors can
								now apply!
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
								title="Post Another Job"
								onPress={handlePostAnotherJob}
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
		backgroundColor: "white"
	},
	modalContainerApp: {
		height: 450,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	modalContainerWeb: {
		height: 500,
		width: 400,
		borderRadius: 35
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35
	},
	backgroundImageApp: {
		paddingVertical: 50,
		gap: 20
	},
	backgroundImageWeb: {
		paddingVertical: 65,
		gap: 30
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
		paddingTop: 5,
		textTransform: "capitalize"
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		width: 250,
		textAlign: "center",
		letterSpacing: 0.5
	},
	formButtonsWrapper: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	}
})
