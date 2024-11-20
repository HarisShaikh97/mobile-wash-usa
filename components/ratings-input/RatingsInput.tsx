import { View, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

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
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					setRatings(1)
				}}
			>
				<Ionicons
					name={ratings >= 1 ? "star-sharp" : "star-outline"}
					size={size}
					color="#FBBA1D"
				/>
			</TouchableOpacity>
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
