import { View, StyleSheet } from "react-native"
import { RgbaColor, HexColor } from "../../utils/types"

// Interface for the props of the component
interface HorizontalSeparatorProps {
	color: RgbaColor | HexColor
}

export default function HorizontalSeparator({
	color
}: HorizontalSeparatorProps): React.ReactElement | null {
	// Return the horizontal separator with the specified color
	return <View style={[styles.horizontalLine, { backgroundColor: color }]} />
}

const styles = StyleSheet.create({
	horizontalLine: {
		height: 1,
		maxHeight: 1,
		flexGrow: 1
	}
})
