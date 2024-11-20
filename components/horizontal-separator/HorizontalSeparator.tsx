import { View, StyleSheet } from "react-native"
import { RgbaColor, HexColor } from "../../utils/types"

interface HorizontalSeparatorProps {
	color: RgbaColor | HexColor
}

export default function HorizontalSeparator({
	color
}: HorizontalSeparatorProps): React.ReactElement | null {
	return <View style={[styles.horizontalLine, { backgroundColor: color }]} />
}

const styles = StyleSheet.create({
	horizontalLine: {
		height: 1,
		maxHeight: 1,
		flexGrow: 1
	}
})
