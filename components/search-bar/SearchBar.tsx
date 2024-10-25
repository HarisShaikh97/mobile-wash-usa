import { View, TextInput, StyleSheet } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import { RgbaColor, HexColor } from "../../utils/types"

interface SearchBarProps {
	placeholder: string
	color: RgbaColor | HexColor
	value: string
	onChangeText: (text: string) => void
}

export default function SearchBar({
	placeholder,
	color,
	value,
	onChangeText
}: SearchBarProps): React.ReactElement | null {
	return (
		<View style={[styles.container, { borderColor: color }]}>
			<AntDesign name="search1" size={15} color={color} />
			<TextInput
				style={styles.inputField}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={color}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: "100%",
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 12.5,
		paddingHorizontal: 15
	},
	inputField: {
		flex: 1,
		fontSize: 12.5
	}
})
