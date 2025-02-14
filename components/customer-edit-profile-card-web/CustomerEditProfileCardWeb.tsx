import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../input-field/InputField"
import { theme } from "../../utils/constants"

export default function CustomerEditProfileCardWeb(): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	const [newImage, setNewImage] = useState<string | null>(null) // State to store the selected image URI
	const [fullName, setFullName] = useState<string>("") // State to store the full name
	const [phoneNumber, setPhoneNumber] = useState<string>("") // State to store the phone number
	const [email, setEmail] = useState<string>("") // State to store the email
	const [location, setLocation] = useState<string>("") // State to store the location

	// Callback function to pick an image from the device's gallery
	const pickImage = useCallback(async (): Promise<void> => {
		// Requesting permission to access the library
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1
			})

		// If the user picked an image, set the newImage state with the URI of the picked image else log a message
		if (!result.canceled && result.assets && result.assets.length > 0) {
			setNewImage(result.assets[0].uri)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage])

	// Callback function to handle the save action
	const handleSave = useCallback(() => {
		router.navigate("/user/home") // Navigate to the home page
	}, [router])

	// Callback function to handle the cancel action
	const handleCancel = useCallback(() => {
		router.back() // Navigate back
	}, [router])
	return (
		// Main container for the edit profile card
		<View style={styles.container}>
			{/* Profile image section with upload button */}
			<View style={styles.profileImageContainer}>
				{/* Display either the newly selected image or default profile image */}
				<Image
					source={
						newImage
							? { uri: newImage }
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
			{/* Form container for user information */}
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
	)
}

const styles = StyleSheet.create({
	container: {
		width: 675,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 25,
		borderRadius: 17.5,
		backgroundColor: "white",
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
