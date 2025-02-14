import { View, StyleSheet } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Offer } from "../../utils/types"

// Interface for the props of the component
interface RatingsProps {
	ratings: Offer["ratings"]
	size: number
}

export default function Ratings({
	ratings,
	size
}: RatingsProps): React.ReactElement | null {
	return (
		<View style={styles.container}>
			{/* First star - displays full, empty, or half star based on rating > 0.5 */}
			<FontAwesome
				name={
					ratings > 0.5
						? "star"
						: ratings === 0
						? "star-o"
						: "star-half-o"
				}
				size={size}
				color="#FBBA1D"
			/>
			{/* Second star - displays full, empty, or half star based on rating > 1.5 */}
			<FontAwesome
				name={
					ratings > 1.5
						? "star"
						: ratings <= 1
						? "star-o"
						: "star-half-o"
				}
				size={size}
				color="#FBBA1D"
			/>
			{/* Third star - displays full, empty, or half star based on rating > 2.5 */}
			<FontAwesome
				name={
					ratings > 2.5
						? "star"
						: ratings <= 2
						? "star-o"
						: "star-half-o"
				}
				size={size}
				color="#FBBA1D"
			/>
			{/* Fourth star - displays full, empty, or half star based on rating > 3.5 */}
			<FontAwesome
				name={
					ratings > 3.5
						? "star"
						: ratings <= 3
						? "star-o"
						: "star-half-o"
				}
				size={size}
				color="#FBBA1D"
			/>
			{/* Fifth star - displays full, empty, or half star based on rating > 4.5 */}
			<FontAwesome
				name={
					ratings > 4.5
						? "star"
						: ratings <= 4
						? "star-o"
						: "star-half-o"
				}
				size={size}
				color="#FBBA1D"
			/>
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
