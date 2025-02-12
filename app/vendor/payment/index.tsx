import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [cardNumber, setCardNumber] = useState<string>("") // State for card number input
	const [expiryDate, setExpiryDate] = useState<string>("") // State for expiry date input
	const [CVC, setCVC] = useState<string>("") // State for CVC input
	const [cardHolderName, setCardHolderName] = useState<string>("") // State for card holder name input

	// Memoized callback for handling form submission
	const handleSubmit = useCallback(() => {
		router.navigate("/vendor/home") // Navigate to home page
	}, [router])

	return (
		// Main container for the payment form
		<View style={styles.container}>
			{/* Container for the form inputs */}
			<View style={styles.formContainer}>
				{/* Title text for the payment form */}
				<Text style={styles.titleText}>Enter your card details</Text>
				{/* Input field for card number */}
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
				{/* Wrapper for expiry date and CVC inputs */}
				<View style={styles.inputFieldsWrapper}>
					{/* Input field for card expiry date */}
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
					{/* Input field for card CVC */}
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
				{/* Input field for cardholder name */}
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
			{/* Submit button for the payment form */}
			<FormButton
				length="full"
				colorTheme="dark"
				isLoading={false}
				title="Confirm Payment"
				onPress={handleSubmit}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 25
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 30,
		textTransform: "capitalize",
		width: 235
	},
	inputFieldsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
