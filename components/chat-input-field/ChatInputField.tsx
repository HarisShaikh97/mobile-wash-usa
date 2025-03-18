import { useState, useCallback } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ChatInputFieldProps {
	value: string
	onChangeText: (text: string) => void
	onSubmit: () => void
}

export default function ChatInputField({
	value,
	onChangeText,
	onSubmit
}: ChatInputFieldProps): React.ReactElement | null {
	// State for storing the image URI
	const [newImage, setNewImage] =
		useState<ImagePicker.ImagePickerResult | null>(null)

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
	}, [setNewImage, ImagePicker])

	return (
		// Main container for the chat input field
		<View style={styles.inputFieldContainer}>
			{/* Camera button to pick images */}
			<TouchableOpacity onPress={pickImage}>
				<Image
					source={require("../../assets/icons/camera.svg")}
					style={styles.cameraIcon}
					contentFit="contain"
				/>
			</TouchableOpacity>
			{/* Text input field for chat messages */}
			{newImage?.assets ? (
				<Text style={styles.inputField}>
					{newImage.assets[0].fileName}
				</Text>
			) : (
				<TextInput
					style={styles.inputField}
					value={value}
					onChangeText={onChangeText}
					placeholder="Say something"
					placeholderTextColor={"rgba(51, 51, 51, 0.3)"}
				/>
			)}
			{/* Send button container */}
			<TouchableOpacity
				style={styles.sendButtonContainer}
				onPress={onSubmit}
			>
				{/* Send icon */}
				<Image
					source={require("../../assets/icons/send.svg")}
					style={styles.sendIcon}
					contentFit="contain"
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldContainer: {
		height: 60,
		width: "100%",
		borderWidth: 1,
		borderColor: "#F5F5F5",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 7.5
	},
	inputField: {
		flex: 1,
		fontSize: 11.5
	},
	cameraIcon: {
		height: 15,
		width: 15,
		marginLeft: 5
	},
	sendButtonContainer: {
		height: 45,
		width: 45,
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	sendIcon: {
		height: 15,
		width: 15
	}
})
