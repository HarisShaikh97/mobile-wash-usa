import { TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"

export default function BackButton(): React.ReactElement | null {
	const router = useRouter()
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.back()}
		>
			<AntDesign name="arrowleft" size={15} color="black" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 32.5,
		width: 32.5,
		backgroundColor: "rgba(255,255,255,0.15)",
		borderWidth: 1,
		borderRadius: 7.5,
		borderColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center"
	}
})
