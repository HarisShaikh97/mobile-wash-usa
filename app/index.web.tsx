import { useState, useCallback, useMemo } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, useFocusEffect } from "expo-router"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	runOnJS
} from "react-native-reanimated"
import { BlurView } from "expo-blur"
import { theme, backgroundImages } from "../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0) // State for storing the current image index
	const [nextImageIndex, setNextImageIndex] = useState<number>(1) // State for storing the next image index

	// Reanimated values for controlling the opacity of the background images
	const opacity = useSharedValue<number>(1)

	// Memoized callback for updating the current background image index
	const updateCurrentImageIndex = useCallback((): void => {
		// Update the current image index by incrementing it by 1
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [backgroundImages, setCurrentImageIndex])

	// Memoized callback for updating the next background image index
	const updateNextImageIndex = useCallback((): void => {
		// Update the next image index by incrementing it by 1
		setNextImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [backgroundImages, setNextImageIndex])

	// Memoized callback for triggering the animation sequence
	const triggerAnimation = useCallback((): void => {
		// Animate the opacity value using the withSequence function
		opacity.value = withSequence(
			withTiming(0, { duration: 500 }, (finished) => {
				// If the animation is finished, update the current image index
				if (finished) {
					runOnJS(updateCurrentImageIndex)()
				}
			}),
			withDelay(
				100,
				withTiming(1, { duration: 50 }, (finished) => {
					// If the animation is finished, update the next image index
					if (finished) {
						runOnJS(updateNextImageIndex)()
					}
				})
			)
		)
	}, [opacity, updateCurrentImageIndex, updateNextImageIndex])

	// Memoized animated style for controlling the opacity of the background images
	const bgImage = useAnimatedStyle(
		() => ({
			opacity: opacity.value
		}),
		[opacity]
	)

	// Effect to trigger the animation on focus
	useFocusEffect(
		// Memoized callback for triggering the animation on focus
		useCallback((): (() => void) => {
			// Set an interval to trigger the animation every 2500 milliseconds
			const intervalId = setInterval(triggerAnimation, 2500)

			// Return a cleanup function to clear the interval when the component unmounts
			return (): void => {
				clearInterval(intervalId)
				opacity.value = 1
			}
		}, [triggerAnimation, opacity])
	)

	// Memoized values for the current and next background images
	const currentImage = useMemo(
		() => backgroundImages[currentImageIndex],
		[backgroundImages, currentImageIndex]
	)

	// Memoized next background image based on the next index
	const nextImage = useMemo(
		() => backgroundImages[nextImageIndex],
		[backgroundImages, nextImageIndex]
	)

	// Memoized callback for handling login
	const handleLogin = useCallback((): void => {
		router.navigate("/auth/login") // Navigate to login page
	}, [router])

	// Memoized callback for handling sign up
	const handleSignUp = useCallback((): void => {
		router.navigate("/auth/sign-up") // Navigate to sign up page
	}, [router])

	return (
		<View style={styles.container}>
			{/* Animated background image that fades in/out */}
			<Animated.Image
				source={currentImage}
				style={[
					styles.background,
					styles.currentBackgroundImage,
					bgImage
				]}
				resizeMode="cover"
			/>
			{/* Static background image that shows during transition */}
			<Image
				source={nextImage}
				style={[styles.background, styles.nextBackgroundImage]}
				contentFit="cover"
			/>
			{/* Overlay container with main content */}
			<View style={[styles.background, styles.overlay]}>
				{/* Card containing login/signup options */}
				<View style={styles.cardContainer}>
					{/* App logo */}
					<Image
						source={require("../assets/logo/logo.png")}
						style={styles.logoImage}
						contentFit="contain"
					/>
					{/* Welcome text */}
					<Text style={styles.salutationText}>Let's Get Started</Text>
					{/* Description text */}
					<Text style={styles.descriptionText} numberOfLines={4}>
						Please Log In Or Sign Up To Find The Best Service
						Providers For All Your Vehicle, Residential, And
						Commercial Wash And Maintenance Needs.
					</Text>
					{/* Primary action buttons container */}
					<View style={styles.buttonsWrapper}>
						{/* Sign up button */}
						<TouchableOpacity
							style={[styles.actionButton, styles.signUpButton]}
							onPress={handleSignUp}
						>
							<Text style={styles.actionButtonText}>Sign Up</Text>
						</TouchableOpacity>
						{/* Login button */}
						<TouchableOpacity
							style={[styles.actionButton, styles.loginButton]}
							onPress={handleLogin}
						>
							<Text style={styles.actionButtonText}>Login</Text>
						</TouchableOpacity>
					</View>
					{/* Social login section text */}
					<Text style={styles.descriptionText}>
						Or Via Google And Facebook
					</Text>
					{/* Social login buttons container */}
					<View style={styles.buttonsWrapper}>
						{/* Google login button */}
						<TouchableOpacity>
							<BlurView
								intensity={18}
								tint="light"
								style={styles.socialLoginButton}
							>
								<Image
									source={require("../assets/icons/google.svg")}
									alt="google"
									style={styles.socialIcon}
									contentFit="contain"
								/>
							</BlurView>
						</TouchableOpacity>
						{/* Facebook login button */}
						<TouchableOpacity>
							<BlurView
								intensity={18}
								tint="light"
								style={styles.socialLoginButton}
							>
								<Image
									source={require("../assets/icons/facebook.svg")}
									alt="google"
									style={styles.socialIcon}
									contentFit="contain"
								/>
							</BlurView>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative"
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%"
	},
	currentBackgroundImage: {
		zIndex: 10
	},
	nextBackgroundImage: {
		zIndex: -10
	},
	overlay: {
		zIndex: 100,
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 675,
		borderRadius: 25,
		backgroundColor: "rgba(26, 61, 124, 0.85)",
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 25
	},
	logoImage: {
		height: 185,
		width: 185,
		marginVertical: 15
	},
	salutationText: {
		fontSize: 50,
		fontFamily: "Montserrat-Bold",
		color: "white"
	},
	descriptionText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Light",
		color: "white",
		width: 400,
		textAlign: "center",
		lineHeight: 25
	},
	buttonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginVertical: 20
	},
	actionButton: {
		height: 55,
		width: 150,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 16.5,
		color: "white",
		fontFamily: "Roboto-Medium",
		letterSpacing: 0.5
	},
	loginButton: {
		backgroundColor: theme.colors.primary
	},
	signUpButton: {
		borderColor: theme.colors.primary,
		borderWidth: 2
	},
	socialLoginButton: {
		height: 55,
		width: 75,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center"
	},
	socialIcon: {
		height: 22.5,
		width: 22.5
	}
})
