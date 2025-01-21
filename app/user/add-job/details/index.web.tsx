import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../../components/input-field/InputField"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const [dateTime, setDateTime] = useState<string>("") // State for storing date and time
	const [budget, setBudget] = useState<number>(0) // State for storing budget

	// Memoized function to handle location selection
	const handleSelectLocation = useCallback(() => {
		router.navigate("/user/add-job/select-location") // Navigating to the location selection page
	}, [router])

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/review") // Navigating to the review page
	}, [router])

	return (
		// Using AddJobWebLayout component for layout
		<AddJobWebLayout>
			{/* Main container for the page */}
			<View style={styles.container}>
				{/* Title text for the page */}
				<Text style={styles.titleText}>Set job details</Text>
				{/* Container for the form fields */}
				<View style={styles.formContainer}>
					{/* Wrapper for the budget input field */}
					<View style={styles.inputFieldWrapper}>
						{/* Title text for the budget field */}
						<Text style={styles.inputFieldTitleText}>Budget</Text>
						{/* BudgetInput component for budget input */}
						<BudgetInput
							value={budget}
							setValue={setBudget}
							mode="web"
						/>
					</View>
					{/* Wrapper for the location input field */}
					<View style={styles.inputFieldWrapper}>
						{/* Title text for the location field */}
						<Text style={styles.inputFieldTitleText}>Location</Text>
						{/* TouchableOpacity for selecting a location */}
						<TouchableOpacity
							style={styles.inputFieldContainer}
							onPress={handleSelectLocation}
						>
							{/* Text for the location field */}
							<Text style={styles.inputFieldText}>
								Select Your Location
							</Text>
						</TouchableOpacity>
					</View>
					{/* InputField component for date and time input */}
					<InputField
						length="full"
						type="text"
						value={dateTime}
						onChangeText={setDateTime}
						title="Date & Time"
						multiline={false}
						secureTextEntry={false}
						placeholder="DD/MM/YYYY TT"
					/>
					{/* Wrapper for the form submission button */}
					<View style={styles.formButtonWrapper}>
						{/* FormButton component for form submission */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
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
		justifyContent: "center",
		gap: 50
	},
	titleText: {
		fontSize: 37.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		textTransform: "capitalize"
	},
	formContainer: {
		width: "70%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	inputFieldWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5,
		zIndex: 50
	},
	inputFieldTitleText: {
		fontFamily: "Roboto-Medium",
		fontSize: 12.5,
		color: theme.colors.secondary,
		marginLeft: 7.5
	},
	inputFieldContainer: {
		height: 50,
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		justifyContent: "center",
		paddingHorizontal: 15
	},
	inputFieldText: {
		fontSize: 12.5,
		color: "rgba(173, 173, 173, 0.94)"
	},
	formButtonWrapper: {
		width: "75%"
	}
})
