import {
	Pressable,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	StyleSheet
} from "react-native"
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	SharedValue
} from "react-native-reanimated"
import { HexColor, RgbaColor } from "../../utils/types"
import { theme } from "../../utils/constants"

interface SwitchToggleProps {
	value: SharedValue<boolean>
	onPress: (event: GestureResponderEvent) => void
	containerStyles?: StyleProp<ViewStyle>
	duration?: number
	trackColors?: {
		on: HexColor | RgbaColor
		off: HexColor | RgbaColor
	}
}

export default function Switch({
	value,
	onPress,
	containerStyles,
	duration = 400,
	trackColors = { on: theme.colors.primary, off: theme.colors.secondary }
}: SwitchToggleProps): React.ReactElement | null {
	const height = useSharedValue(0)
	const width = useSharedValue(0)

	const trackAnimatedStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			Number(value.value),
			[0, 1],
			[trackColors.off, trackColors.on]
		)

		return {
			backgroundColor: withTiming(color, { duration }),
			borderRadius: height.value / 2
		}
	})

	const thumbAnimatedStyle = useAnimatedStyle(() => {
		const moveValue = interpolate(
			Number(value.value),
			[0, 1],
			[0, width.value - height.value]
		)

		return {
			transform: [{ translateX: withTiming(moveValue, { duration }) }],
			borderRadius: height.value / 2
		}
	})

	return (
		<Pressable onPress={onPress}>
			<Animated.View
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height
					width.value = e.nativeEvent.layout.width
				}}
				style={[styles.track, containerStyles, trackAnimatedStyle]}
			>
				<Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	track: {
		alignItems: "flex-start",
		width: 100,
		height: 40,
		padding: 5
	},
	thumb: {
		height: "100%",
		aspectRatio: 1,
		backgroundColor: "white"
	}
})
