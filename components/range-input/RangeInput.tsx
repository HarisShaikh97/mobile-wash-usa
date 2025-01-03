import { useMemo, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useAnimatedProps
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { theme } from "../../utils/constants"

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

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
	const [minValue, setMinValue] = useState<number>(
		Math.floor((minPosition.value * limit) / trackBarLength)
	)

	const [maxValue, setMaxValue] = useState<number>(
		Math.ceil((maxPosition.value * limit) / (trackBarLength - thumbSize))
	)

	const animatedMinStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: minPosition.value }]
		}
	}, [minPosition.value])

	const animatedMaxStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: maxPosition.value }]
		}
	}, [maxPosition.value])

	const animatedProgressStyle = useAnimatedStyle(() => {
		return {
			left: minPosition.value,
			width: maxPosition.value + thumbSize - minPosition.value
		}
	}, [minPosition.value, maxPosition.value, thumbSize])

	const gestureMin = useMemo(
		() =>
			Gesture.Pan().onUpdate((event) => {
				const newMinPosition =
					minPosition.value + event.x - thumbSize / 2

				if (
					newMinPosition < maxPosition.value - thumbSize &&
					newMinPosition >= 0
				) {
					minPosition.value = newMinPosition
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

	const gestureMax = useMemo(
		() =>
			Gesture.Pan().onUpdate((event) => {
				const newMaxPosition =
					maxPosition.value + event.x - thumbSize / 2

				if (
					newMaxPosition > minPosition.value + thumbSize &&
					newMaxPosition <= trackBarLength - thumbSize
				) {
					maxPosition.value = newMaxPosition
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

	const minAnimatedProps = useAnimatedProps(() => {
		return {
			text: `${Math.floor((minPosition.value * limit) / trackBarLength)}`,
			defaultValue: `${Math.floor(
				(minPosition.value * limit) / trackBarLength
			)}`
		}
	})

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
		<View style={styles.sliderWrapper}>
			<Text style={[styles.minMaxText, styles.inputFieldTitleText]}>
				{title}
			</Text>
			<View style={styles.minMaxSectionWrapper}>
				<View style={styles.minMaxItemWrapper}>
					<Text style={styles.minMaxText}>Min</Text>
					<View style={styles.minMaxQuantityContainer}>
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
				<View style={styles.separator} />
				<View style={styles.minMaxItemWrapper}>
					<Text style={styles.minMaxText}>Max</Text>
					<View style={styles.minMaxQuantityContainer}>
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
			<View style={[styles.sliderTrackBar, { width: trackBarLength }]}>
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
				<Animated.View
					style={[styles.sliderProgressBar, animatedProgressStyle]}
				/>
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
		gap: 25,
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
