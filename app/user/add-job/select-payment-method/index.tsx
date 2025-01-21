import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import PaymentInformationModal from "../../../../components/payment-information-modal/PaymentInformationModal"
import { theme } from "../../../../utils/constants"
import { PaymentOptions } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const [selectedOption, setSelectedOption] = useState<PaymentOptions>("card") // State for managing the selected payment option
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing the modal visibility

	// Memoized function to handle form submission
	const handleProceed = useCallback((): void => {
		setOpenModal(false) // Closing the modal
		router.navigate(
			// Navigating to the next page based on the selected payment option
			selectedOption === "pod"
				? "/user/home"
				: "/user/add-job/payment-card-details"
		)
	}, [openModal, router])

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		setOpenModal(true) // Opening the modal on form submission
	}, [setOpenModal])

	return (
		// ImageBackground component for the screen's background image
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* PaymentInformationModal component for managing payment information */}
			<PaymentInformationModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedOption={selectedOption}
				handleProceed={handleProceed}
				mode="app"
			/>
			{/* View container for the header section */}
			<View style={styles.headerContainer}>
				{/* BackButton component for navigation */}
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
			</View>
			{/* View container for the body section */}
			<View style={styles.bodyContainer}>
				{/* View container for the form section */}
				<View style={styles.formContainer}>
					{/* View container for the title wrapper */}
					<View style={styles.titleWrapper}>
						{/* Text for the title */}
						<Text style={styles.titleText}>
							Select Your Payment Method
						</Text>
						{/* Text for the description */}
						<Text style={styles.descriptionText}>
							To post this job, please select your preferred
							payment method.
						</Text>
					</View>
					{/* Text for the heading */}
					<Text style={styles.headingText}>Options</Text>
					{/* View container for the payment options wrapper */}
					<View style={styles.paymentOptionsWrapper}>
						{/* TouchableOpacity for the card payment option */}
						<TouchableOpacity
							style={styles.paymentOptionContainer}
							onPress={() => {
								setSelectedOption("card")
								// Setting the selected option to "card" on press
							}}
						>
							{/* View container for the payment option title wrapper */}
							<View style={styles.paymentOptionTitleWrapper}>
								{/* Image for the card icon */}
								<Image
									source={require("../../../../assets/icons/card.svg")}
									style={styles.paymentOptionIcon}
									contentFit="contain"
								/>
								{/* Text for the card payment option */}
								<Text style={styles.paymentOptionTitleText}>
									Credit Card/Debit Card
								</Text>
							</View>
							{/* View for the checkbox */}
							<View
								style={[
									styles.checkBox,
									selectedOption === "card"
										? styles.checkboxChecked
										: styles.checkboxUnChecked
								]}
							>
								{/* Inner circle for the checkbox */}
								{selectedOption === "card" && (
									<View style={styles.checkboxInnerCircle} />
								)}
							</View>
						</TouchableOpacity>
						{/* Similar structure for the paypal payment option */}
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
						{/* Similar structure for the pay on delivery payment option */}
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
				{/* FormButton for submitting the form */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
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
