import { useState, useCallback } from "react"
import {
	ScrollView,
	KeyboardAvoidingView,
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { showToastable } from "react-native-toastable"
import BackButton from "../../../../components/back-button/BackButton"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { addJobDetails } from "../../../../features/add-job/addJobSlice"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve new job details from Redux store
	const newJobDetails = useSelector((state: RootState) => state.addJob)

	// State variables for managing date and time, budget, and date picker visibility
	const [dateTime, setDateTime] = useState<Date | null>(null) // Stores the selected date and time
	const [address, setAddress] = useState<string>(newJobDetails.address || "") // State for storing address
	const [budget, setBudget] = useState<number>(newJobDetails.budget || 0) // Stores the selected budget
	const [images, setImages] = useState<ImagePicker.ImagePickerResult | null>(
		null
	) // State to store the selected images result
	const [isDatePickerVisible, setDatePickerVisibility] =
		useState<boolean>(false) // Toggles the visibility of the date picker

	// Function to show the date picker
	const showDatePicker = useCallback((): void => {
		// Set the visibility of the date picker to true
		setDatePickerVisibility(true)
	}, [setDatePickerVisibility])

	// Function to hide the date picker
	const hideDatePicker = useCallback((): void => {
		// Set the visibility of the date picker to false
		setDatePickerVisibility(false)
	}, [setDatePickerVisibility])

	// Function to handle date and time selection
	const handleConfirm = useCallback(
		(date: Date): void => {
			// Update the state with the chosen date
			setDateTime(date)
			// Hide the date picker after selection
			hideDatePicker()
		},
		[setDateTime, hideDatePicker]
	)

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Checking if all required fields are filled
		if (address.length > 0 && dateTime) {
			// Dispatching the addJobNeeds action with the job details
			dispatch(
				addJobDetails({
					budget: budget,
					address: address,
					dateTime: dateTime.toISOString(),
					images: images
				})
			)

			// Navigate to the location selection page
			router.navigate("/user/add-job/select-location")
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
		// KeyboardAvoidingView to handle keyboard visibility and scrolling
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* ScrollView to enable vertical scrolling */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Main container for the page */}
				<View style={styles.container}>
					{/* Date picker modal, visible when the user selects a date and time */}
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
					{/* ImageBackground for the header, displaying a background image */}
					<ImageBackground
						source={require("../../../../assets/images/add-job-header.png")}
						style={styles.headerBackgroundImage}
						contentFit="fill"
					>
						{/* Header container, including the back button and title */}
						<View style={styles.headerContainer}>
							{/* BackButton component for navigation */}
							<BackButton
								size="small"
								color="#000000"
								backgroundColor="#F5F5F5"
								borderColor="transparent"
							/>
							{/* Title text for the page */}
							<Text style={styles.titleText}>
								Set Job Details
							</Text>
						</View>
					</ImageBackground>
					{/* Body container, including the form fields and buttons */}
					<View style={styles.bodyContainer}>
						{/* Input field wrapper for the budget field */}
						<View style={styles.inputFieldWrapper}>
							{/* Title text for the budget field */}
							<Text style={styles.inputFieldTitleText}>
								Budget
							</Text>
							{/* BudgetInput component for selecting a budget */}
							<BudgetInput
								value={budget}
								setValue={setBudget}
								mode="app"
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
						{/* Input field wrapper for the date and time field */}
						<View style={styles.inputFieldWrapper}>
							{/* Title text for the date and time field */}
							<Text style={styles.inputFieldTitleText}>
								Date & Time
							</Text>
							{/* TouchableOpacity for selecting a date and time */}
							<TouchableOpacity
								style={styles.inputFieldContainer}
								onPress={showDatePicker}
							>
								{/* Text for the date and time field */}
								<Text style={styles.inputFieldText}>
									{dateTime
										? dateTime.toLocaleString()
										: "05 October 2011 14:48 UTC"}
								</Text>
							</TouchableOpacity>
						</View>
						{/* InputField component for images input */}
						<InputField
							length="full"
							title="Upload Images"
							placeholder="Upload your job images"
							images={images}
							onUploadImage={setImages}
							type="image"
						/>
						{/* FormButton for submitting the form */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column"
	},
	headerBackgroundImage: {
		width: "100%"
	},
	headerContainer: {
		padding: 25,
		flexDirection: "column",
		gap: 25,
		backgroundColor: "rgba(255, 255, 255, 0.75)"
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		paddingHorizontal: 25,
		paddingBottom: 25,
		gap: 15
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
	}
})
