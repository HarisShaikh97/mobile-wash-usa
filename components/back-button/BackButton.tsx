import { TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import { HexColor, RgbaColor } from "../../utils/types"

interface BackButtonProps {
	color: HexColor | RgbaColor | "transparent"
	backgroundColor: HexColor | RgbaColor | "transparent"
	borderColor: HexColor | RgbaColor | "transparent"
}

export default function BackButton({
	color,
	backgroundColor,
	borderColor
}: BackButtonProps): React.ReactElement | null {
	const router = useRouter()
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: backgroundColor, borderColor: borderColor }
			]}
			onPress={() => router.back()}
		>
			<AntDesign name="arrowleft" size={15} color={color} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 32.5,
		width: 32.5,
		borderWidth: 1,
		borderRadius: 7.5,
		alignItems: "center",
		justifyContent: "center"
	}
})
