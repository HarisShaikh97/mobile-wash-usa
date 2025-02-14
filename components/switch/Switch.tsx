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

// Interface for the props of the component
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
	// Shared value for the track height
	const height = useSharedValue(0)

	// Shared value for the track width
	const width = useSharedValue(0)

	// Animated style for the track
	const trackAnimatedStyle = useAnimatedStyle(() => {
		// Interpolate the color based on the value
		const color = interpolateColor(
			Number(value.value),
			[0, 1],
			[trackColors.off, trackColors.on]
		)

		// Return the animated style with the color and border radius
		return {
			backgroundColor: withTiming(color, { duration }),
			borderRadius: height.value / 2
		}
	}, [value, trackColors, duration, height])

	// Animated style for the thumb
	const thumbAnimatedStyle = useAnimatedStyle(() => {
		// Interpolate the value to move the thumb left or right based on the value
		const moveValue = interpolate(
			Number(value.value),
			[0, 1],
			[0, width.value - height.value]
		)

		// Return the animated style with the move value and border radius
		return {
			transform: [{ translateX: withTiming(moveValue, { duration }) }],
			borderRadius: height.value / 2
		}
	}, [value, duration, width, height])

	return (
		// Pressable component that calls the onPress function when pressed
		<Pressable onPress={onPress}>
			{/* Animated track */}
			<Animated.View
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height
					width.value = e.nativeEvent.layout.width
				}}
				style={[styles.track, containerStyles, trackAnimatedStyle]}
			>
				{/* Animated thumb */}
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
