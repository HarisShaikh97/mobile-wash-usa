import { useCallback } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import Entypo from "@expo/vector-icons/Entypo"
import { theme } from "../../utils/constants"

interface BudgetInputProps {
	value: number
	setValue: (val: number | ((prev: number) => number)) => void
}

export default function BudgetInput({
	value,
	setValue
}: BudgetInputProps): React.ReactElement | null {
	const handleIncrement = useCallback((): void => {
		setValue((prev) => prev + 1)
	}, [setValue])

	const handleDecrement = useCallback((): void => {
		setValue((prev) => (prev === 0 ? prev : prev - 1))
	}, [setValue])

	return (
		<View style={styles.inputFieldContainer}>
			<TouchableOpacity
				style={styles.updateButtonContainer}
				onPress={handleDecrement}
			>
				<Entypo name="minus" size={15} color={theme.colors.primary} />
			</TouchableOpacity>
			<View style={styles.valueTextWrapper}>
				<Text style={styles.valueText}>$</Text>
				<TextInput
					style={styles.valueText}
					value={value.toString()}
					onChangeText={(text) => {
						if (text === "") {
							setValue(0)
						} else {
							const numericValue = parseFloat(text)
							if (!isNaN(numericValue)) {
								setValue(numericValue)
							}
						}
					}}
					keyboardType="numeric"
				/>
			</View>
			<TouchableOpacity
				style={styles.updateButtonContainer}
				onPress={handleIncrement}
			>
				<Entypo name="plus" size={15} color={theme.colors.primary} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldContainer: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	updateButtonContainer: {
		height: 25,
		width: 25,
		borderRadius: 15,
		backgroundColor: "rgba(47, 116, 250, 0.25)",
		alignItems: "center",
		justifyContent: "center"
	},
	valueTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	valueText: {
		flexGrow: 0,
		fontSize: 30,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	}
})
