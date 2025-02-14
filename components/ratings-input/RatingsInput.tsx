import { View, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

// Interface for the props of the component
interface RatingsInputProps {
	ratings: number
	setRatings: (value: number) => void
	size: number
}

export default function RatingsInput({
	ratings,
	setRatings,
	size
}: RatingsInputProps): React.ReactElement | null {
	return (
		// Container for the star rating buttons
		<View style={styles.container}>
			{/* Star rating button for 1 star */}
			<TouchableOpacity
				onPress={() => {
					setRatings(1)
				}}
			>
				<Ionicons
					name={ratings >= 1 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D" // Yellow color for the star
				/>
			</TouchableOpacity>
			{/* Star rating button for 2 stars */}
			<TouchableOpacity
				onPress={() => {
					setRatings(2)
				}}
			>
				<Ionicons
					name={ratings >= 2 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D"
				/>
			</TouchableOpacity>
			{/* Star rating button for 3 stars */}
			<TouchableOpacity
				onPress={() => {
					setRatings(3)
				}}
			>
				<Ionicons
					name={ratings >= 3 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D"
				/>
			</TouchableOpacity>
			{/* Star rating button for 4 stars */}
			<TouchableOpacity
				onPress={() => {
					setRatings(4)
				}}
			>
				<Ionicons
					name={ratings >= 4 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D"
				/>
			</TouchableOpacity>
			{/* Star rating button for 5 stars */}
			<TouchableOpacity
				onPress={() => {
					setRatings(5)
				}}
			>
				<Ionicons
					name={ratings === 5 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D"
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2.5
	}
})
