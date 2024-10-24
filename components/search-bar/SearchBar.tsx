import { View, TextInput, StyleSheet } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"

interface SearchBarProps {
	placeholder: string
	value: string
	onChangeText: (text: string) => void
}

export default function SearchBar({
	placeholder,
	value,
	onChangeText
}: SearchBarProps): React.ReactElement | null {
	return (
		<View style={styles.container}>
			<AntDesign name="search1" size={15} color="#CACACA" />
			<TextInput
				style={styles.inputField}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={"#CACACA"}
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
		borderColor: "#F5F5F5",
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
