import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import FormButton from "../../../../components/form-button/FormButton"
import PaymentInformationModal from "../../../../components/payment-information-modal/PaymentInformationModal"
import { theme } from "../../../../utils/constants"
import { PaymentOptions } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [selectedOption, setSelectedOption] = useState<PaymentOptions>("card")
	const [openModal, setOpenModal] = useState<boolean>(false)

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
		<AddJobWebLayout>
			<PaymentInformationModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedOption={selectedOption}
				handleProceed={handleProceed}
				mode="web"
			/>
			<View style={styles.container}>
				<View style={styles.titleWrapper}>
					<Text style={styles.titleText}>
						Select Your Payment Method
					</Text>
					<Text style={styles.descriptionText}>
						To post this job, please select your preferred payment
						method.
					</Text>
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.headingText}>Options</Text>
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
								<Text style={styles.paymentOptionTitleText}>
									Credit Card/Debit Card
								</Text>
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
								<Text style={styles.paymentOptionTitleText}>
									Paypal
								</Text>
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
								<Text style={styles.paymentOptionTitleText}>
									Pay On Delivery
								</Text>
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
				<View style={styles.formButtonWrapper}>
					<FormButton
						length="full"
						theme="dark"
						title="Next"
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</AddJobWebLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		padding: 35,
		gap: 35
	},
	formContainer: {
		flex: 1,
		width: "80%",
		flexDirection: "column",
		gap: 25
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 325,
		textAlign: "center",
		letterSpacing: 0.5
	},
	descriptionText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 265,
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
		height: 75,
		width: "100%",
		borderRadius: 8.5,
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
	},
	formButtonWrapper: {
		width: "65%"
	}
})
