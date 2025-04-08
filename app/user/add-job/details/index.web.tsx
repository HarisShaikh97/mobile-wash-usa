import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import { showToastable } from "react-native-toastable"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../../components/input-field/InputField"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import FormButton from "../../../../components/form-button/FormButton"
import { addJobDetails } from "../../../../features/add-job/addJobSlice"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve new job details from Redux store
	const newJobDetails = useSelector((state: RootState) => state.addJob)

	const [dateTime, setDateTime] = useState<string>(
		newJobDetails.dateTime || ""
	) // State for storing date and time
	const [address, setAddress] = useState<string>(newJobDetails.address || "") // State for storing address
	const [budget, setBudget] = useState<number>(newJobDetails.budget || 0) // State for storing budget amount
	const [images, setImages] = useState<ImagePicker.ImagePickerResult | null>(
		null
	) // State to store the selected images result

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Checking if all required fields are filled
		if (address.length > 0 && dateTime.length > 0) {
			// Converting the date string to a Date object
			const date = new Date(dateTime)

			// Dispatching the addJobNeeds action with the job details
			dispatch(
				addJobDetails({
					budget: budget,
					address: address,
					dateTime: date.toISOString(),
					images: images
				})
			)

			// Navigate to the review page
			router.navigate("/user/add-job/review")
		} else {
			// Show success toast warning for incomplete form
			showToastable({
				message: "Please fill in all the fields!",
				status: "warning"
			})
		}
	}, [
		router,
		dispatch,
		showToastable,
		addJobDetails,
		budget,
		address,
		dateTime,
		images
	])

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
					{/* InputField component for address input */}
					<InputField
						length="full"
						type="text"
						value={address}
						onChangeText={setAddress}
						title="Address"
						multiline={false}
						secureTextEntry={false}
						placeholder="Enter your address"
					/>
					{/* InputField component for date and time input */}
					<InputField
						length="full"
						type="text"
						value={dateTime}
						onChangeText={setDateTime}
						title="Date & Time"
						multiline={false}
						secureTextEntry={false}
						placeholder="05 October 2011 14:48 UTC"
					/>
					{/* InputField component for images input */}
					<InputField
						length="full"
						title="Upload Images"
						placeholder="Upload your job images"
						images={images}
						onUploadImage={setImages}
						type="image"
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
	formButtonWrapper: {
		width: "75%"
	}
})
