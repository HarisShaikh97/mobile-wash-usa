import { useState, useCallback } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons"
import { theme } from "../../utils/constants"

// Interface for the base props of the component
interface BaseInputFieldProps {
	title: string
	placeholder: string
	length: "full" | "half"
	zIndex?: number
}

// Interface for the select input field props
interface SelectInputFieldProps extends BaseInputFieldProps {
	type: "select"
	data: Array<any>
	value: any
	onChangeValue: (val: any) => void
}

// Interface for the text input field props
interface TextInputFieldProps extends BaseInputFieldProps {
	type: "text"
	value: string
	onChangeText: (text: string) => void
}

// Interface for the text input field props with multiline option
interface TextInputFieldPropsMultiLine extends TextInputFieldProps {
	secureTextEntry: false
	multiline: true
	size: "small" | "large"
}

// Interface for the text input field props with single line option
interface TextInputFieldPropsSingleLine extends TextInputFieldProps {
	secureTextEntry: boolean
	multiline: false
}

// Interface for the file input field props
interface FileInputFieldProps extends BaseInputFieldProps {
	type: "file"
	files: DocumentPicker.DocumentPickerResult | null
	onUploadFile: (value: DocumentPicker.DocumentPickerResult) => void
}

// Union type for the props of the component (single line, multi line, file, select)
type InputFieldProps =
	| TextInputFieldPropsMultiLine
	| TextInputFieldPropsSingleLine
	| FileInputFieldProps
	| SelectInputFieldProps

export default function InputField(
	props: InputFieldProps
): React.ReactElement | null {
	// Extract the title, placeholder, and type from the props
	const { title, placeholder, type } = props

	// State for storing the visibility of the password
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(
		type === "text" ? !props.secureTextEntry : false
	)

	// State for storing the open state of the dropdown
	const [isOpen, setIsOpen] = useState<boolean>(false)

	// Memoized callback for handling file upload
	const handleFileUpload = useCallback(async () => {
		// If the type is file, try to get the file picker result
		if (type === "file") {
			try {
				// Get the file picker result
				const docRes = await DocumentPicker.getDocumentAsync({
					type: "*/*",
					multiple: true
				})
				// Call the onUploadFile callback with the file picker result
				props.onUploadFile(docRes)
			} catch (error) {
				// Log the error message
				console.log("Error while selecting file: ", error)
			}
		}
	}, [type, props])

	return (
		// Main container wrapper
		<View
			style={[
				styles.inputFieldWrapper,
				props.length === "full"
					? styles.inputFieldWrapperFull
					: styles.inputFieldWrapperHalf,
				{ zIndex: props.zIndex || 0 }
			]}
		>
			{/* Input field title */}
			<Text style={styles.inputFieldTitleText}>{title}</Text>
			{/* Input field container */}
			<View
				style={[
					styles.inputFieldContainer,
					type === "text" && props.multiline
						? props.size === "small"
							? styles.inputFieldMultiLineContainerSmall
							: styles.inputFieldMultiLineContainerLarge
						: styles.inputFieldSingleLine
				]}
			>
				{/* Content wrapper for input and icons */}
				<View style={styles.contentWrapper}>
					{type === "text" ? (
						// Text input component
						<TextInput
							style={[
								styles.inputField,
								type === "text" &&
									props.multiline &&
									styles.inputFieldMultiLine
							]}
							value={props.value}
							onChangeText={props.onChangeText}
							placeholder={placeholder}
							placeholderTextColor={"rgba(173, 173, 173, 0.94)"}
							textAlignVertical={props.multiline ? "top" : "auto"}
							secureTextEntry={!isPasswordVisible}
							multiline={props.multiline}
						/>
					) : (
						// Display text for file and select inputs
						<Text
							style={styles.inputFieldText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{/* Display file names, selected value, or placeholder */}
							{props.type === "file" &&
							props.files &&
							props.files.assets &&
							props.files.assets.length > 0
								? props.files.assets
										.map((item) => item.name)
										.join(", ")
								: props.type === "select" && props.value
								? props.value.title
								: placeholder}
						</Text>
					)}
					{/* Right side buttons/icons */}
					{type === "text" ? (
						// Password visibility toggle button
						props.secureTextEntry && (
							<TouchableOpacity
								style={styles.inputFieldButton}
								onPress={() =>
									setIsPasswordVisible((prev) => !prev)
								}
							>
								<Feather
									name={isPasswordVisible ? "eye-off" : "eye"}
									size={15}
									color="rgba(173, 173, 173, 0.94)"
								/>
							</TouchableOpacity>
						)
					) : type === "file" ? (
						// File upload button
						<TouchableOpacity
							style={styles.inputFieldButton}
							onPress={handleFileUpload}
						>
							<MaterialCommunityIcons
								name="paperclip"
								size={15}
								color="rgba(173, 173, 173, 0.94)"
							/>
						</TouchableOpacity>
					) : (
						// Dropdown toggle button
						<TouchableOpacity
							style={styles.inputFieldButton}
							onPress={() => {
								setIsOpen((prev) => !prev)
							}}
						>
							<Entypo
								name={
									isOpen
										? "chevron-thin-up"
										: "chevron-thin-down"
								}
								size={15}
								color="rgba(173, 173, 173, 0.94)"
							/>
						</TouchableOpacity>
					)}
				</View>
				{/* Dropdown options container */}
				{type === "select" && isOpen && (
					<View style={styles.dropdownContainer}>
						{props.data.map(
							(option, index): React.ReactElement | null => {
								return (
									<TouchableOpacity
										key={index}
										onPress={() => {
											props.onChangeValue(option)
											setIsOpen(false)
										}}
									>
										<Text style={styles.inputFieldText}>
											{option.title}
										</Text>
									</TouchableOpacity>
								)
							}
						)}
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldWrapper: {
		flexDirection: "column",
		gap: 7.5
	},
	inputFieldWrapperFull: {
		width: "100%"
	},
	inputFieldWrapperHalf: {
		width: "47.5%"
	},
	inputFieldTitleText: {
		fontFamily: "Roboto-Regular",
		fontSize: 12.5,
		color: theme.colors.secondary,
		marginLeft: 7.5
	},
	inputFieldContainer: {
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		backgroundColor: "white",
		position: "relative"
	},
	contentWrapper: {
		flex: 1,
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	inputFieldSingleLine: {
		height: 50
	},
	inputFieldMultiLineContainerSmall: {
		height: 100
	},
	inputFieldMultiLineContainerLarge: {
		height: 200
	},
	inputFieldMultiLine: {
		paddingVertical: 15
	},
	inputField: {
		paddingHorizontal: 15,
		flex: 1,
		height: "100%",
		borderRadius: 12.5,
		fontSize: 12.5
	},
	inputFieldText: {
		flex: 1,
		fontSize: 12.5,
		paddingHorizontal: 15,
		color: "rgba(173, 173, 173, 0.94)"
	},
	inputFieldButton: {
		paddingHorizontal: 15
	},
	dropdownContainer: {
		width: "100%",
		padding: 15,
		flexDirection: "column",
		gap: 10,
		borderRadius: 10,
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		backgroundColor: "white",
		position: "absolute",
		top: 50,
		left: 0,
		zIndex: 100
	}
})
