import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import Entypo from "@expo/vector-icons/Entypo"
import { theme } from "../../utils/constants"

interface BudgetInputFieldProps {
	value: number
	setValue: (val: number | ((prev: number) => number)) => void
}

export default function BudgetInputField({
	value,
	setValue
}: BudgetInputFieldProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Bold": require("../../assets/fonts/Roboto/Roboto Bold 700.ttf")
	})

	const handleIncrement = useCallback(() => {
		setValue((prev) => prev + 1)
	}, [setValue])

	const handleDecrement = useCallback(() => {
		setValue((prev) => (prev === 0 ? prev : prev - 1))
	}, [setValue])

	return (
		<View style={styles.inputFieldWrapper}>
			{fontsLoaded && (
				<Text style={styles.inputFieldTitleText}>Budget</Text>
			)}
			<View style={styles.inputFieldContainer}>
				<TouchableOpacity
					style={styles.updateButtonContainer}
					onPress={handleDecrement}
				>
					<Entypo
						name="minus"
						size={15}
						color={theme.colors.primary}
					/>
				</TouchableOpacity>
				{fontsLoaded && <Text style={styles.valueText}>${value}</Text>}
				<TouchableOpacity
					style={styles.updateButtonContainer}
					onPress={handleIncrement}
				>
					<Entypo
						name="plus"
						size={15}
						color={theme.colors.primary}
					/>
				</TouchableOpacity>
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
	valueText: {
		fontSize: 30,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	}
})
