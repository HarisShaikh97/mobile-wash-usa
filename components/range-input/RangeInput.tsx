import { useMemo, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useAnimatedProps
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { theme } from "../../utils/constants"

// Creating an animated component for the TextInput component
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

// Interface for the props of the component
interface RangeInputProps {
	title: string
	trackBarLength: number
	thumbSize: number
	limit: number
	minPosition: SharedValue<number>
	maxPosition: SharedValue<number>
	mode: "app" | "web"
}

export default function RangeInput({
	title,
	trackBarLength,
	thumbSize,
	limit,
	minPosition,
	maxPosition,
	mode
}: RangeInputProps): React.ReactElement | null {
	// State for storing the minimum value of the range slider
	const [minValue, setMinValue] = useState<number>(
		Math.floor((minPosition.value * limit) / trackBarLength)
	)

	// State for storing the maximum value of the range slider
	const [maxValue, setMaxValue] = useState<number>(
		Math.ceil((maxPosition.value * limit) / (trackBarLength - thumbSize))
	)

	// Memoized animated style for the minimum position of the range slider
	const animatedMinStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: minPosition.value }]
		}
	}, [minPosition.value])

	// Memoized animated style for the maximum position of the range slider
	const animatedMaxStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: maxPosition.value }]
		}
	}, [maxPosition.value])

	// Memoized animated style for the progress bar of the range slider
	const animatedProgressStyle = useAnimatedStyle(() => {
		return {
			left: minPosition.value,
			width: maxPosition.value + thumbSize - minPosition.value
		}
	}, [minPosition.value, maxPosition.value, thumbSize])

	// Memoized gesture handler for the minimum position of the range slider
	const gestureMin = useMemo(
		() =>
			Gesture.Pan().onUpdate((event) => {
				// Calculate the new minimum position based on the current position and the gesture's x-coordinate
				const newMinPosition =
					minPosition.value + event.x - thumbSize / 2

				// If the new minimum position is within the range of the maximum position minus the thumb size and greater than or equal to 0, update the minimum position
				if (
					newMinPosition < maxPosition.value - thumbSize &&
					newMinPosition >= 0
				) {
					minPosition.value = newMinPosition
					// If the mode is web, update the minimum value
					if (mode === "web") {
						setMinValue(
							Math.floor(
								(newMinPosition * limit) / trackBarLength
							)
						)
					}
				}
			}),
		[minPosition, maxPosition, thumbSize, setMinValue, mode]
	)

	// Memoized gesture handler for the maximum position of the range slider
	const gestureMax = useMemo(
		() =>
			Gesture.Pan().onUpdate((event) => {
				// Calculate the new maximum position based on the current position and the gesture's x-coordinate
				const newMaxPosition =
					maxPosition.value + event.x - thumbSize / 2

				// If the new maximum position is within the range of the minimum position plus the thumb size and less than or equal to the track bar length minus the thumb size, update the maximum position
				if (
					newMaxPosition > minPosition.value + thumbSize &&
					newMaxPosition <= trackBarLength - thumbSize
				) {
					maxPosition.value = newMaxPosition
					// If the mode is web, update the maximum value
					if (mode === "web") {
						setMaxValue(
							Math.ceil(
								(newMaxPosition * limit) /
									(trackBarLength - thumbSize)
							)
						)
					}
				}
			}),
		[minPosition, maxPosition, thumbSize, trackBarLength, setMaxValue, mode]
	)

	// Memoized animated props for the minimum and maximum TextInput components
	const minAnimatedProps = useAnimatedProps(() => {
		return {
			text: `${Math.floor((minPosition.value * limit) / trackBarLength)}`,
			defaultValue: `${Math.floor(
				(minPosition.value * limit) / trackBarLength
			)}`
		}
	})

	// Memoized animated props for the minimum and maximum TextInput components
	const maxAnimatedProps = useAnimatedProps(() => {
		return {
			text: `${Math.ceil(
				(maxPosition.value * limit) / (trackBarLength - thumbSize)
			)}`,
			defaultValue: `${Math.ceil(
				(maxPosition.value * limit) / (trackBarLength - thumbSize)
			)}`
		}
	})

	return (
		// Main wrapper for the slider component
		<View style={styles.sliderWrapper}>
			{/* Title of the range input */}
			<Text style={[styles.minMaxText, styles.inputFieldTitleText]}>
				{title}
			</Text>
			{/* Container for min/max value display section */}
			<View style={styles.minMaxSectionWrapper}>
				{/* Minimum value section */}
				<View style={styles.minMaxItemWrapper}>
					<Text style={styles.minMaxText}>Min</Text>
					{/* Container for displaying minimum value */}
					<View style={styles.minMaxQuantityContainer}>
						{/* Conditional rendering based on mode (app/web) */}
						{mode === "app" ? (
							<AnimatedTextInput
								animatedProps={minAnimatedProps}
								style={styles.minMaxQuantityText}
								editable={false}
							/>
						) : (
							<Text style={styles.minMaxQuantityText}>
								{minValue}
							</Text>
						)}
					</View>
				</View>
				{/* Visual separator between min and max sections */}
				<View style={styles.separator} />
				{/* Maximum value section */}
				<View style={styles.minMaxItemWrapper}>
					<Text style={styles.minMaxText}>Max</Text>
					{/* Container for displaying maximum value */}
					<View style={styles.minMaxQuantityContainer}>
						{/* Conditional rendering based on mode (app/web) */}
						{mode === "app" ? (
							<AnimatedTextInput
								animatedProps={maxAnimatedProps}
								style={styles.minMaxQuantityText}
								editable={false}
							/>
						) : (
							<Text style={styles.minMaxQuantityText}>
								{maxValue}
							</Text>
						)}
					</View>
				</View>
			</View>
			{/* Slider track bar container */}
			<View style={[styles.sliderTrackBar, { width: trackBarLength }]}>
				{/* Gesture detector for minimum thumb */}
				<GestureDetector gesture={gestureMin}>
					<Animated.View
						style={[
							styles.sliderThumb,
							{
								height: thumbSize,
								width: thumbSize,
								borderRadius: thumbSize / 2,
								top: -((thumbSize - 5) / 2)
							},
							animatedMinStyle
						]}
					/>
				</GestureDetector>
				{/* Progress bar showing selected range */}
				<Animated.View
					style={[styles.sliderProgressBar, animatedProgressStyle]}
				/>
				{/* Gesture detector for maximum thumb */}
				<GestureDetector gesture={gestureMax}>
					<Animated.View
						style={[
							styles.sliderThumb,
							{
								height: thumbSize,
								width: thumbSize,
								borderRadius: thumbSize / 2,
								top: -((thumbSize - 5) / 2)
							},
							animatedMaxStyle
						]}
					/>
				</GestureDetector>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	sliderWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 15,
		marginBottom: 15,
		zIndex: 0
	},
	inputFieldTitleText: {
		marginLeft: 7.5
	},
	sliderTrackBar: {
		height: 5,
		borderRadius: 2.5,
		backgroundColor: "#F5F5F5",
		position: "relative",
		alignSelf: "center"
	},
	sliderProgressBar: {
		height: 5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.primary,
		position: "absolute",
		top: 0
	},
	sliderThumb: {
		backgroundColor: theme.colors.primary,
		position: "absolute",
		zIndex: 10
	},
	minMaxSectionWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	minMaxItemWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	minMaxQuantityContainer: {
		height: 45,
		width: 75,
		borderRadius: 7.5,
		borderWidth: 2,
		borderColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center"
	},
	minMaxQuantityText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.primary,
		textAlign: "center"
	},
	minMaxText: {
		fontFamily: "Roboto-Medium",
		fontSize: 12.5,
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	separator: {
		height: 2,
		width: 7.5,
		backgroundColor: theme.colors.secondary
	}
})
