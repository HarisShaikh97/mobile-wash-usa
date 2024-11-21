import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import PaymentInformationModal from "../../../../components/payment-information-modal/PaymentInformationModal"
import { theme } from "../../../../utils/constants"
import { PaymentOptions } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [selectedOption, setSelectedOption] = useState<PaymentOptions>("card")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Montserrat-SemiBold": require("../../../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Montserrat-Medium": require("../../../../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
		"Roboto-Regular": require("../../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleProceed = useCallback((): void => {
		setOpenModal(false)
		router.navigate(
			selectedOption === "pod"
				? "/user/home"
				: "/user/add-job/payment-card-details"
		)
	}, [openModal, router])

	const handleSubmit = useCallback(() => {
		setOpenModal(true)
	}, [setOpenModal])

	return (
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<PaymentInformationModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedOption={selectedOption}
				handleProceed={handleProceed}
			/>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.formContainer}>
					<View style={styles.titleWrapper}>
						{fontsLoaded && (
							<Text style={styles.titleText}>
								Select Your Payment Method
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.descriptionText}>
								To post this job, please select your preferred
								payment method.
							</Text>
						)}
					</View>
					{fontsLoaded && (
						<Text style={styles.headingText}>Options</Text>
					)}
					<View style={styles.paymentOptionsWrapper}>
						<TouchableOpacity
							style={styles.paymentOptionContainer}
							onPress={() => {
								setSelectedOption("card")
							}}
						>
							<View style={styles.paymentOptionTitleWrapper}>
								<Image
									source={require("../../../../assets/icons/card.svg")}
									style={styles.paymentOptionIcon}
									contentFit="contain"
								/>
								{fontsLoaded && (
									<Text style={styles.paymentOptionTitleText}>
										Credit Card/Debit Card
									</Text>
								)}
							</View>
							<View
								style={[
									styles.checkBox,
									selectedOption === "card"
										? styles.checkboxChecked
										: styles.checkboxUnChecked
								]}
							>
								{selectedOption === "card" && (
									<View style={styles.checkboxInnerCircle} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.paymentOptionContainer}
							onPress={() => {
								setSelectedOption("paypal")
							}}
						>
							<View style={styles.paymentOptionTitleWrapper}>
								<Image
									source={require("../../../../assets/icons/paypal.svg")}
									style={styles.paymentOptionIcon}
									contentFit="contain"
								/>
								{fontsLoaded && (
									<Text style={styles.paymentOptionTitleText}>
										Paypal
									</Text>
								)}
							</View>
							<View
								style={[
									styles.checkBox,
									selectedOption === "paypal"
										? styles.checkboxChecked
										: styles.checkboxUnChecked
								]}
							>
								{selectedOption === "paypal" && (
									<View style={styles.checkboxInnerCircle} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.paymentOptionContainer}
							onPress={() => {
								setSelectedOption("pod")
							}}
						>
							<View style={styles.paymentOptionTitleWrapper}>
								<Image
									source={require("../../../../assets/icons/pay-on-delivery.svg")}
									style={styles.paymentOptionIcon}
									contentFit="contain"
								/>
								{fontsLoaded && (
									<Text style={styles.paymentOptionTitleText}>
										Pay On Delivery
									</Text>
								)}
							</View>
							<View
								style={[
									styles.checkBox,
									selectedOption === "pod"
										? styles.checkboxChecked
										: styles.checkboxUnChecked
								]}
							>
								{selectedOption === "pod" && (
									<View style={styles.checkboxInnerCircle} />
								)}
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<FormButton
					length="full"
					theme="dark"
					title="Select Payment"
					onPress={handleSubmit}
				/>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		paddingHorizontal: 25
	},
	headerContainer: {
		paddingVertical: 35
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 25
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 275,
		textAlign: "center",
		lineHeight: 30
	},
	descriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 250,
		textAlign: "center"
	},
	headingText: {
		fontSize: 17.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	paymentOptionsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	paymentOptionContainer: {
		height: 65,
		width: "100%",
		borderRadius: 7.5,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20
	},
	paymentOptionTitleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
	paymentOptionIcon: {
		height: 20,
		width: 20
	},
	paymentOptionTitleText: {
		fontSize: 15,
		fontFamily: "Montserrat-Medium",
		color: theme.colors.secondary
	},
	checkBox: {
		height: 20,
		width: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		padding: 3
	},
	checkboxChecked: {
		backgroundColor: "rgba(47, 116, 250, 0.25)"
	},
	checkboxUnChecked: {
		borderWidth: 1.5,
		borderColor: "#F5F5F5"
	},
	checkboxInnerCircle: {
		height: "100%",
		width: "100%",
		borderRadius: 10,
		backgroundColor: theme.colors.primary
	}
})
