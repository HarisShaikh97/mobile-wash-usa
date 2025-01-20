import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import Feather from "@expo/vector-icons/Feather"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import JobPostSuccessfulModal from "../../../../components/job-post-successful-modal/JobPostSuccessfulModal"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// State variables for managing card details and modal visibility
	const [cardNumber, setCardNumber] = useState<string>("") // State for storing card number
	const [expiryDate, setExpiryDate] = useState<string>("") // State for storing expiry date
	const [CVC, setCVC] = useState<string>("") // State for storing CVC
	const [cardHolderName, setCardHolderName] = useState<string>("") // State for storing card holder name
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		setOpenModal(true) // Function to open the modal on form submission
	}, [setOpenModal])

	return (
		<AddJobWebLayout>
			{/* JobPostSuccessfulModal component for displaying the success modal */}
			<JobPostSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="web"
			/>
			{/* Main container for the payment details */}
			<View style={styles.container}>
				{/* Title text for the payment section */}
				<Text style={styles.titleText}>Payment</Text>
				{/* Container for the payment form fields */}
				<View style={styles.formContainer}>
					{/* Header container for the payment form */}
					<View style={styles.formHeaderContainer}>
						{/* View container for the payment method wrapper */}
						<View style={styles.paymentMethodWrapper}>
							{/* Text for the payment method */}
							<Text
								style={[
									styles.paymentMethodText,
									styles.paymentMethodTextBlack
								]}
							>
								Method of payment
							</Text>
							{/* TouchableOpacity for changing the payment method */}
							<TouchableOpacity
								style={styles.changeButtonContainer}
							>
								{/* Icon for editing the payment method */}
								<Feather
									name="edit"
									size={15}
									color={theme.colors.primary}
								/>
								{/* Text for changing the payment method */}
								<Text
									style={[
										styles.paymentMethodText,
										styles.paymentMethodTextBlue
									]}
								>
									Change
								</Text>
							</TouchableOpacity>
						</View>
						{/* View container for the card details */}
						<View style={styles.cardContainer}>
							{/* View container for the card text wrapper */}
							<View style={styles.cardTextWrapper}>
								{/* Title text for the card */}
								<Text style={styles.cardTitleText}>
									Credit or Debit card
								</Text>
								{/* Description text for the card */}
								<Text style={styles.cardDescriptionText}>
									Online payment
								</Text>
							</View>
							{/* Image for the card icon */}
							<Image
								source={require("../../../../assets/icons/master-card.svg")}
								style={styles.cardIcon}
								contentFit="contain"
							/>
						</View>
					</View>
					{/* InputField component for the card number */}
					<InputField
						length="full"
						type="text"
						title="Card Number"
						placeholder="0000 0000 0000 0000"
						value={cardNumber}
						onChangeText={setCardNumber}
						secureTextEntry={false}
						multiline={false}
					/>
					{/* View container for the input fields wrapper */}
					<View style={styles.inputFieldsWrapper}>
						{/* InputField component for the expiry date */}
						<InputField
							length="half"
							type="text"
							title="Expiry Date"
							placeholder="MM/YY"
							value={expiryDate}
							onChangeText={setExpiryDate}
							secureTextEntry={false}
							multiline={false}
						/>
						{/* InputField component for the CVC */}
						<InputField
							length="half"
							type="text"
							title="CVC"
							placeholder="000"
							value={CVC}
							onChangeText={setCVC}
							secureTextEntry={false}
							multiline={false}
						/>
					</View>
					{/* InputField component for the card holder name */}
					<InputField
						length="full"
						type="text"
						title="Card Holder Name"
						placeholder="Full name"
						value={cardHolderName}
						onChangeText={setCardHolderName}
						secureTextEntry={false}
						multiline={false}
					/>
				</View>
				{/* View container for the form submission button */}
				<View style={styles.formButtonWrapper}>
					{/* FormButton component for form submission */}
					<FormButton
						length="full"
						theme="dark"
						title="Confirm Payment"
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
		padding: 30,
		gap: 50
	},
	formContainer: {
		flex: 1,
		width: "80%",
		flexDirection: "column",
		gap: 25
	},
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 325,
		textAlign: "center",
		letterSpacing: 0.5
	},
	formHeaderContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	paymentMethodWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	paymentMethodText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium"
	},
	paymentMethodTextBlack: {
		color: theme.colors.secondary
	},
	paymentMethodTextBlue: {
		color: theme.colors.primary
	},
	changeButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 7.5
	},
	cardContainer: {
		height: 75,
		width: "100%",
		borderRadius: 10,
		backgroundColor: theme.colors.secondary,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	cardIcon: {
		height: 25,
		width: 25
	},
	cardTextWrapper: {
		flexDirection: "column"
	},
	cardTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: "white"
	},
	cardDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Light",
		color: "white"
	},
	inputFieldsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	formButtonWrapper: {
		width: "60%"
	}
})
