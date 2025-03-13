import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import { DocumentPickerResult } from "expo-document-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../components/input-field/InputField"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [newImage, setNewImage] = useState<string | null>(null) // State for storing new image
	const [fullName, setFullName] = useState<string>("") // State for storing full name
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State for storing phone number
	const [email, setEmail] = useState<string>("") // State for storing email
	const [location, setLocation] = useState<string>("") // State for storing location
	const [businessInformation, setBusinessInformation] = useState<string>("") // State for storing business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State for storing uploaded documents

	// Memoized function to handle picking an image from the device
	const pickImage = useCallback(async (): Promise<void> => {
		// Requesting permission to access the device's image library
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allowing selection of images only
				quality: 1 // Setting image quality to maximum
			})

		// Checking if an image was selected and setting the new image state
		if (!result.canceled && result.assets && result.assets.length > 0) {
			setNewImage(result.assets[0].uri)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage])

	// Memoized function to handle saving the account details
	const handleSave = useCallback((): void => {
		router.navigate("/vendor/email-verification") // Navigating to the email verification screen
	}, [router])

	// Memoized function to handle cancelling the action
	const handleCancel = useCallback((): void => {
		router.back() // Navigating back to the previous page
	}, [router])

	return (
		// Main container for the edit account form
		<View style={styles.container}>
			{/* Profile image section with upload button */}
			<View style={styles.profileImageContainer}>
				<Image
					source={
						newImage
							? { uri: newImage }
							: require("../../../assets/images/vendor-profile.png")
					}
					style={styles.profileImage}
					contentFit="cover"
				/>
				{/* Upload button overlay */}
				<TouchableOpacity
					style={styles.uploadButton}
					onPress={pickImage}
				>
					<Feather name="upload" size={12.5} color="white" />
				</TouchableOpacity>
			</View>
			{/* Form container with input fields */}
			<View style={styles.formContainer}>
				{/* Full name input field */}
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
				{/* Phone number input field */}
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
				{/* Email input field */}
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
					<InputField
						length="full"
						title="Upload Documents"
						placeholder="Insurance, Business License, etc."
						files={documents}
						onUploadFile={setDocuments}
						type="file"
					/>
					{/* Document upload description */}
					<View style={styles.documentInputDescriptionTextWrapper}>
						<View style={styles.bulletMarker} />
						<Text style={styles.documentInputDescriptionText}>
							Upload PDF or Image Documents As Proof Of Business
							Verification.
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
			</View>
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
						style={[styles.actionButtonText, styles.saveButtonText]}
					>
						Save
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 35,
		marginBottom: 25,
		paddingHorizontal: 10
	},
	profileImageContainer: {
		height: 115,
		width: 115,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	profileImage: {
		height: "100%",
		width: "100%",
		borderRadius: 13.5,
		overflow: "hidden"
	},
	uploadButton: {
		height: 27.5,
		width: 27.5,
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
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	documentInputWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	bulletMarker: {
		height: 3.5,
		width: 3.5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.secondary,
		marginTop: 7.5
	},
	documentInputDescriptionTextWrapper: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 25,
		paddingBottom: 5
	},
	documentInputDescriptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	actionButtonContainer: {
		height: 50,
		width: 125,
		borderRadius: 10,
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
