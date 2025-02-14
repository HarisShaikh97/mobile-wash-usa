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

// Interface for the props of the component
interface BudgetInputProps {
	value: number
	setValue: (val: number | ((prev: number) => number)) => void
	mode: "web" | "app"
}

export default function BudgetInput({
	value,
	setValue,
	mode
}: BudgetInputProps): React.ReactElement | null {
	// Memoized callback for incrementing the value
	const handleIncrement = useCallback((): void => {
		setValue((prev) => prev + 1) // Increment the value
	}, [setValue])

	// Memoized callback for decrementing the value
	const handleDecrement = useCallback((): void => {
		setValue((prev) => (prev === 0 ? prev : prev - 1)) // Decrement the value
	}, [setValue])

	return (
		// Main container for the budget input component
		<View style={styles.inputFieldContainer}>
			{/* Decrement button */}
			<TouchableOpacity
				style={styles.updateButtonContainer}
				onPress={handleDecrement}
			>
				<Entypo name="minus" size={15} color={theme.colors.primary} />
			</TouchableOpacity>
			{/* Conditional rendering based on mode */}
			{mode === "app" ? (
				// Input field for app mode with dollar sign and editable value
				<View style={styles.valueTextWrapper}>
					<Text style={styles.valueText}>$</Text>
					<TextInput
						style={styles.valueText}
						value={value.toString()}
						onChangeText={(text) => {
							// Reset to 0 if input is empty
							if (text === "") {
								setValue(0)
							} else {
								// Convert input to number and update if valid
								const numericValue = parseFloat(text)
								if (!isNaN(numericValue)) {
									setValue(numericValue)
								}
							}
						}}
						keyboardType="numeric"
					/>
				</View>
			) : (
				// Display-only text for web mode
				<Text style={styles.valueText}>${value}</Text>
			)}
			{/* Increment button */}
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
