import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import BackButton from "../../../../components/back-button/BackButton"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import JobPostSuccessfulModal from "../../../../components/job-post-successful-modal/JobPostSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
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
		// ImageBackground component for the screen's background image
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* JobPostSuccessfulModal component for displaying the success modal */}
			<JobPostSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
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
				{/* View container for the form fields */}
				<View style={styles.formContainer}>
					{/* Title text for the payment section */}
					<Text style={styles.titleText}>Payment</Text>
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
				{/* FormButton component for confirming payment */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Confirm Payment"
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
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 30
	},
	inputFieldsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
