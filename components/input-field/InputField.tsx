import { useState, useCallback } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useFonts } from "expo-font"
import * as DocumentPicker from "expo-document-picker"
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons"
import { theme } from "../../utils/constants"
import { SelectOption } from "../../utils/types"

interface BaseInputFieldProps {
	title: string
	placeholder: string
}

interface SelectInputFieldProps extends BaseInputFieldProps {
	type: "select"
	data: SelectOption[]
	value: SelectOption | null
	onChangeValue: (val: SelectOption) => void
}

interface TextInputFieldProps extends BaseInputFieldProps {
	type: "text"
	value: string
	onChangeText: (text: string) => void
}

interface TextInputFieldPropsMultiLine extends TextInputFieldProps {
	secureTextEntry: false
	multiline: true
	size: "small" | "large"
}

interface TextInputFieldPropsSingleLine extends TextInputFieldProps {
	secureTextEntry: boolean
	multiline: false
}

interface FileInputFieldProps extends BaseInputFieldProps {
	type: "file"
	files: DocumentPicker.DocumentPickerResult | null
	onUploadFile: (value: DocumentPicker.DocumentPickerResult) => void
}

type InputFieldProps =
	| TextInputFieldPropsMultiLine
	| TextInputFieldPropsSingleLine
	| FileInputFieldProps
	| SelectInputFieldProps

export default function InputField(
	props: InputFieldProps
): React.ReactElement | null {
	const { title, placeholder, type } = props

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(
		type === "text" ? !props.secureTextEntry : false
	)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleFileUpload = useCallback(async () => {
		if (type === "file") {
			try {
				const docRes = await DocumentPicker.getDocumentAsync({
					type: "*/*",
					multiple: true
				})
				props.onUploadFile(docRes)
			} catch (error) {
				console.log("Error while selecting file: ", error)
			}
		}
	}, [type, props])

	return (
		<View style={styles.inputFieldWrapper}>
			{fontsLoaded && (
				<Text style={styles.inputFieldTitleText}>{title}</Text>
			)}
			<View
				style={[
					styles.inputFieldContainer,
					type === "text" && props.multiline
						? props.size === "small"
							? styles.inputFieldMultiLineSmall
							: styles.inputFieldMultiLineLarge
						: styles.inputFieldSingleLine
				]}
			>
				<View style={styles.contentWrapper}>
					{type === "text" ? (
						<TextInput
							style={styles.inputField}
							value={props.value}
							onChangeText={props.onChangeText}
							placeholder={placeholder}
							placeholderTextColor={"rgba(173, 173, 173, 0.94)"}
							textAlignVertical={props.multiline ? "top" : "auto"}
							secureTextEntry={!isPasswordVisible}
							multiline={props.multiline}
						/>
					) : (
						<Text
							style={styles.inputFieldText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
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
					{type === "text" ? (
						props.secureTextEntry && (
							<TouchableOpacity
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
						<TouchableOpacity onPress={handleFileUpload}>
							<MaterialCommunityIcons
								name="paperclip"
								size={15}
								color="rgba(173, 173, 173, 0.94)"
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
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
				{type === "select" && isOpen && (
					<View style={styles.dropdownContainer}>
						{props.data.map(
							(
								option: SelectOption,
								index: number
							): React.ReactElement | null => {
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
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		position: "relative"
	},
	contentWrapper: {
		flex: 1,
		paddingHorizontal: 15,
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	inputFieldSingleLine: {
		height: 50
	},
	inputFieldMultiLineSmall: {
		height: 100,
		paddingVertical: 15
	},
	inputFieldMultiLineLarge: {
		height: 200,
		paddingVertical: 15
	},
	inputField: {
		flex: 1,
		height: "100%",
		fontSize: 12.5
	},
	inputFieldText: {
		flex: 1,
		fontSize: 12.5,
		color: "rgba(173, 173, 173, 0.94)"
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
		left: 0
	}
})
