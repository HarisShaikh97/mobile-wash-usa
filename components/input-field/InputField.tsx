import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useFonts } from "expo-font"
import Feather from "@expo/vector-icons/Feather"
import { theme } from "../../utils/constants"

interface InputFieldProps {
	title: string
	placeholder: string
	value: string
	secureTextEntry: boolean
	onChangeText: (text: string) => void
}

export default function InputField({
	title,
	placeholder,
	value,
	secureTextEntry,
	onChangeText
}: InputFieldProps): React.ReactElement | null {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(
		!secureTextEntry
	)

	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={styles.inputFieldWrapper}>
			{fontsLoaded && (
				<Text style={styles.inputFieldTitleText}>{title}</Text>
			)}
			<View style={styles.inputFieldContainer}>
				<TextInput
					style={styles.inputField}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={"rgba(173, 173, 173, 0.5)"}
					secureTextEntry={!isPasswordVisible}
				/>
				{secureTextEntry && (
					<TouchableOpacity
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? (
							<Feather
								name="eye-off"
								size={15}
								color="rgba(173, 173, 173, 0.5)"
							/>
						) : (
							<Feather
								name="eye"
								size={15}
								color="rgba(173, 173, 173, 0.5)"
							/>
						)}
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
		height: 50,
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		paddingHorizontal: 15,
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	inputField: {
		flex: 1,
		fontSize: 15
	}
})
