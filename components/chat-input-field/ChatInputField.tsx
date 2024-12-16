import { useState, useCallback } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { theme } from "../../utils/constants"

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
	const [newImage, setNewImage] = useState<string | null>(null)

	const pickImage = useCallback(async (): Promise<void> => {
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1
			})

		if (!result.canceled && result.assets && result.assets.length > 0) {
			setNewImage(result.assets[0].uri)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage])

	return (
		<View style={styles.inputFieldContainer}>
			<TouchableOpacity onPress={pickImage}>
				<Image
					source={require("../../assets/icons/camera.svg")}
					style={styles.cameraIcon}
					contentFit="contain"
				/>
			</TouchableOpacity>
			<TextInput
				style={styles.inputField}
				value={value}
				onChangeText={onChangeText}
				placeholder="Say something"
				placeholderTextColor={"rgba(51, 51, 51, 0.3)"}
			/>
			<TouchableOpacity
				style={styles.sendButtonContainer}
				onPress={onSubmit}
			>
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
