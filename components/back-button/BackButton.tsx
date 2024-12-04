import { TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import { HexColor, RgbaColor } from "../../utils/types"

interface BackButtonProps {
	size: "small" | "large"
	color: HexColor | RgbaColor | "transparent"
	backgroundColor: HexColor | RgbaColor | "transparent"
	borderColor: HexColor | RgbaColor | "transparent"
}

export default function BackButton({
	size,
	color,
	backgroundColor,
	borderColor
}: BackButtonProps): React.ReactElement | null {
	const router = useRouter()
	return (
		<TouchableOpacity
			style={[
				styles.container,
				size === "small"
					? styles.containerSmall
					: styles.containerLarge,
				{ backgroundColor: backgroundColor, borderColor: borderColor }
			]}
			onPress={() => router.back()}
		>
			<AntDesign
				name="arrowleft"
				size={size === "small" ? 15 : 20}
				color={color}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	containerSmall: {
		height: 32.5,
		width: 32.5,
		borderRadius: 7.5
	},
	containerLarge: {
		height: 45,
		width: 45,
		borderRadius: 8.5
	},
	arrowIconSmall: {
		height: 15,
		width: 15
	},
	arrowIconLarge: {
		height: 20,
		width: 20
	}
})
