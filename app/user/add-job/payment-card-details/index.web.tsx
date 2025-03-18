import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
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
	const handleSubmit = useCallback((): void => {
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
						colorTheme="dark"
						isLoading={false}
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
