import { useState, useCallback } from "react"
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import { DocumentPickerResult } from "expo-document-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../input-field/InputField"
import { RootState } from "../../store/store"
import { theme } from "../../utils/constants"

export default function VendorEditProfileCardWeb(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize the router instance for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	const [newImage, setNewImage] =
		useState<ImagePicker.ImagePickerResult | null>(null) // State to store the selected image URI
	const [fullName, setFullName] = useState<string>(user?.full_name || "") // State to store the full name
	const [phoneNumber, setPhoneNumber] = useState<string>(
		user?.phone_number || ""
	) // State to store the phone number
	const [email, setEmail] = useState<string>(user?.email || "") // State to store the email
	const [location, setLocation] = useState<string>(user?.address || "") // State to store the location
	const [businessInformation, setBusinessInformation] = useState<string>(
		user?.business_information || ""
	) // State to store the business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State to store the selected documents

	// Memoized callback for picking an image from the library
	const pickImage = useCallback(async (): Promise<void> => {
		// Requesting permission to access the library
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allowing selection of images only
				quality: 1 // Setting image quality to maximum
			})

		// If the user picked an image, set the newImage state with the URI of the picked image else log a message
		if (!result.canceled) {
			setNewImage(result)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage])

	// Memoized callback for handling the save action
	const handleSave = useCallback(() => {
		router.navigate("/vendor/home") // Navigate to the home page
	}, [router])

	// Memoized callback for handling the cancel action
	const handleCancel = useCallback(() => {
		router.back() // Navigate back
	}, [router])
	return (
		// Main scrollable container for the edit profile form
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				{/* Profile image section with upload button */}
				<View style={styles.profileImageContainer}>
					<Image
						source={
							newImage?.assets
								? { uri: newImage.assets[0].uri } // Using the selected image URI
								: user &&
								  user.profile_pic &&
								  user.profile_pic.length > 0
								? {
										uri: `${BASE_URL}/storage/${user.profile_pic}`
								  }
								: require("../../assets/images/profile.png")
						}
						style={styles.profileImage}
						contentFit="cover"
					/>
					{/* Upload button overlay */}
					<TouchableOpacity
						style={styles.uploadButton}
						onPress={pickImage}
					>
						<Feather name="upload" size={13.5} color="white" />
					</TouchableOpacity>
				</View>
				{/* Form container with input fields */}
				<View style={styles.formContainer}>
					{/* Input field for full name */}
					<InputField
						length="full"
						type="text"
						value={fullName}
						onChangeText={setFullName}
						title="Full Name"
						placeholder="John Doe"
						secureTextEntry={false}
						multiline={false}
					/>
					{/* Input field for phone number */}
					<InputField
						length="full"
						type="text"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						title="Phone"
						placeholder="+1 333 6656 666"
						secureTextEntry={false}
						multiline={false}
					/>
					{/* Input field for email */}
					<InputField
						length="full"
						type="text"
						value={email}
						onChangeText={setEmail}
						title="Email"
						placeholder="johndoe@gmail.com"
						secureTextEntry={false}
						multiline={false}
					/>
					{/* Business information textarea */}
					<InputField
						length="full"
						title="Business Information"
						placeholder="Tell us about your business or the services you provide."
						value={businessInformation}
						onChangeText={setBusinessInformation}
						secureTextEntry={false}
						multiline={true}
						size="small"
						type="text"
					/>
					{/* Document upload section */}
					<View style={styles.documentInputWrapper}>
						{/* Input field for document upload */}
						<InputField
							length="full"
							title="Upload Documents"
							placeholder="Insurance, Business License, etc."
							files={documents}
							onUploadFile={setDocuments}
							type="file"
						/>
						{/* Document upload description */}
						<View
							style={styles.documentInputDescriptionTextWrapper}
						>
							<View style={styles.bulletMarker} />
							<Text style={styles.documentInputDescriptionText}>
								Upload PDF or Image Documents As Proof Of
								Business Verification.
							</Text>
						</View>
					</View>
					{/* Location input field */}
					<InputField
						length="full"
						type="text"
						value={location}
						onChangeText={setLocation}
						title="Location"
						placeholder="California, USA"
						secureTextEntry={false}
						multiline={false}
					/>
					{/* Action buttons container */}
					<View style={styles.actionButtonsWrapper}>
						{/* Cancel button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.cancelButtonContainer
							]}
							onPress={handleCancel}
						>
							<Text
								style={[
									styles.actionButtonText,
									styles.cancelButtonText
								]}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						{/* Save button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.saveButtonContainer
							]}
							onPress={handleSave}
						>
							<Text
								style={[
									styles.actionButtonText,
									styles.saveButtonText
								]}
							>
								Save
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		maxWidth: 675,
		flex: 1,
		borderRadius: 17.5,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "row",
		gap: 25,
		padding: 25
	},
	profileImageContainer: {
		height: 165,
		width: 165,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	profileImage: {
		height: "100%",
		width: "100%",
		borderRadius: 12.5,
		overflow: "hidden"
	},
	uploadButton: {
		height: 30,
		width: 30,
		borderRadius: 3.5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.tertiary,
		position: "absolute",
		right: -5,
		bottom: -5,
		zIndex: 50
	},
	formContainer: {
		flex: 1,
		flexDirection: "column",
		gap: 15,
		padding: 10
	},
	documentInputWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	bulletMarker: {
		height: 5,
		width: 5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.secondary,
		marginTop: 3.5
	},
	documentInputDescriptionTextWrapper: {
		width: "80%",
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 25,
		paddingBottom: 5
	},
	documentInputDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		paddingTop: 25,
		marginBottom: 10
	},
	actionButtonContainer: {
		height: 55,
		width: 140,
		borderRadius: 11.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium"
	},
	cancelButtonContainer: {
		borderWidth: 1,
		borderColor: theme.colors.primary
	},
	cancelButtonText: {
		color: theme.colors.primary
	},
	saveButtonContainer: {
		backgroundColor: theme.colors.primary
	},
	saveButtonText: {
		color: "white"
	}
})
