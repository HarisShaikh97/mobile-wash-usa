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
import Feather from "@expo/vector-icons/Feather"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { theme } from "../../utils/constants"

interface BaseInputFieldProps {
	title: string
	placeholder: string
}

interface TextInputFieldProps extends BaseInputFieldProps {
	type: "text"
	value: string
	onChangeText: (text: string) => void
}

interface TextInputFieldPropsMultiLine extends TextInputFieldProps {
	secureTextEntry: false
	multiline: true
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

export default function InputField(
	props: InputFieldProps
): React.ReactElement | null {
	const { title, placeholder, type } = props

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(
		type === "text" ? !props.secureTextEntry : false
	)

	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleFileUpload = useCallback(async () => {
		if (type === "file") {
			try {
				const docRes = await DocumentPicker.getDocumentAsync({
					type: "*/*",
					multiple: true
				})
				console.log(docRes)
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
						? styles.inputFieldMultiLine
						: styles.inputFieldSingleLine
				]}
			>
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
						style={styles.fileNameText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{props.files &&
						props.files.assets &&
						props.files.assets.length > 0
							? props.files.assets.map((item, key) => {
									return `${item.name}${
										props.files &&
										props.files.assets &&
										props.files.assets.length > 0 &&
										key < props.files.assets.length - 1
											? ","
											: ""
									}`
							  })
							: placeholder}
					</Text>
				)}
				{type === "text" ? (
					props.secureTextEntry && (
						<TouchableOpacity
							onPress={() =>
								setIsPasswordVisible(!isPasswordVisible)
							}
						>
							{isPasswordVisible ? (
								<Feather
									name="eye-off"
									size={15}
									color="rgba(173, 173, 173, 0.94)"
								/>
							) : (
								<Feather
									name="eye"
									size={15}
									color="rgba(173, 173, 173, 0.94)"
								/>
							)}
						</TouchableOpacity>
					)
				) : (
					<TouchableOpacity onPress={handleFileUpload}>
						<MaterialCommunityIcons
							name="paperclip"
							size={15}
							color="rgba(173, 173, 173, 0.94)"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5
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
		paddingHorizontal: 15,
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	inputFieldSingleLine: {
		height: 50
	},
	inputFieldMultiLine: {
		height: 100,
		paddingVertical: 15
	},
	inputField: {
		flex: 1,
		height: "100%",
		fontSize: 12.5
	},
	fileNameText: {
		flex: 1,
		fontSize: 12.5,
		color: "rgba(173, 173, 173, 0.94)"
	}
})
