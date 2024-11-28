import { useCallback } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useFonts } from "expo-font"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	runOnJS
} from "react-native-reanimated"
import {
	GestureDetector,
	Gesture,
	GestureHandlerRootView
} from "react-native-gesture-handler"
import { theme } from "../../utils/constants"

const THUMB_SIZE = 20
const TRACK_BAR_LENGTH = 300

interface RangeInputProps {
	limit: number
	minValue: number
	setMinValue: (val: number | ((prev: number) => number)) => void
	maxValue: number
	setMaxValue: (val: number | ((prev: number) => number)) => void
}

export default function RangeInput({
	limit,
	minValue,
	setMinValue,
	maxValue,
	setMaxValue
}: RangeInputProps): React.ReactElement | null {
	const handleMinPosition = useSharedValue(0)
	const handleMaxPosition = useSharedValue(280)

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const animatedMinStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: handleMinPosition.value }]
		}
	}, [handleMinPosition.value])

	const animatedMaxStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: handleMaxPosition.value }]
		}
	}, [handleMaxPosition.value])

	const animatedProgressStyle = useAnimatedStyle(() => {
		return {
			left: handleMinPosition.value,
			width:
				handleMaxPosition.value + THUMB_SIZE - handleMinPosition.value
		}
	})

	const gestureMin = Gesture.Pan().onUpdate((event) => {
		const newMinPosition =
			handleMinPosition.value + event.x - THUMB_SIZE / 2

		if (
			newMinPosition < handleMaxPosition.value - THUMB_SIZE &&
			newMinPosition >= 0
		) {
			handleMinPosition.value = newMinPosition
		}
	})

	const gestureMax = Gesture.Pan().onUpdate((event) => {
		const newMaxPosition =
			handleMaxPosition.value + event.x - THUMB_SIZE / 2

		if (
			newMaxPosition > handleMinPosition.value + THUMB_SIZE &&
			newMaxPosition <= TRACK_BAR_LENGTH - THUMB_SIZE
		) {
			handleMaxPosition.value = newMaxPosition
		}
	})

	return (
		<GestureHandlerRootView style={styles.sliderWrapper}>
			{fontsLoaded && (
				<Text style={[styles.minMaxText, styles.inputFieldTitleText]}>
					Budget range
				</Text>
			)}
			<View style={styles.minMaxSectionWrapper}>
				<View style={styles.minMaxItemWrapper}>
					{fontsLoaded && <Text style={styles.minMaxText}>Min</Text>}
					<View style={styles.minMaxQuantityContainer}>
						{fontsLoaded && (
							<Text style={styles.minMaxQuantityText}>
								{minValue}
							</Text>
						)}
					</View>
				</View>
				<View style={styles.separator} />
				<View style={styles.minMaxItemWrapper}>
					{fontsLoaded && <Text style={styles.minMaxText}>Max</Text>}
					<View style={styles.minMaxQuantityContainer}>
						{fontsLoaded && (
							<Text style={styles.minMaxQuantityText}>
								{maxValue}
							</Text>
						)}
					</View>
				</View>
			</View>
			<View style={styles.sliderTrackBar}>
				<GestureDetector gesture={gestureMin}>
					<Animated.View
						style={[styles.sliderThumb, animatedMinStyle]}
					/>
				</GestureDetector>
				<Animated.View
					style={[styles.sliderProgressBar, animatedProgressStyle]}
				/>
				<GestureDetector gesture={gestureMax}>
					<Animated.View
						style={[styles.sliderThumb, animatedMaxStyle]}
					/>
				</GestureDetector>
			</View>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	sliderWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 25,
		zIndex: 0
	},
	inputFieldTitleText: {
		marginLeft: 7.5
	},
	sliderTrackBar: {
		height: 5,
		width: TRACK_BAR_LENGTH,
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
		height: THUMB_SIZE,
		width: THUMB_SIZE,
		borderRadius: THUMB_SIZE / 2,
		backgroundColor: theme.colors.primary,
		position: "absolute",
		top: -((THUMB_SIZE - 5) / 2),
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
		color: theme.colors.primary
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
