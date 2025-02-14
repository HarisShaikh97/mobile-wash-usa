import { useMemo, useCallback } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface NavItemProps extends BottomTabBarProps {
	route: RouteProp<{ [key: string]: object | undefined }, string>
	index: number
}

export default function NavItemWeb({
	state,
	descriptors,
	navigation,
	route,
	index
}: NavItemProps): React.ReactElement | null {
	// Memoize the options based on the descriptors and route key
	const options = useMemo(() => {
		return descriptors[route.key].options
	}, [descriptors, route])

	// Memoize the label based on the options and route name
	const label = useMemo(() => {
		return options.tabBarLabel !== undefined
			? options.tabBarLabel
			: options.title !== undefined
			? options.title
			: route.name
	}, [options, route])

	// Memoize the isFocused value based on the state and index
	const isFocused = useMemo(() => state.index === index, [state.index, index])

	// Memoize the icon map based on the isFocused value
	const iconMap = useMemo(
		() => ({
			Home: isFocused
				? require("../../assets/icons/home-blue.svg")
				: require("../../assets/icons/home.svg"),
			"My Jobs": isFocused
				? require("../../assets/icons/my-jobs-blue.svg")
				: require("../../assets/icons/my-jobs.svg"),
			Messages: isFocused
				? require("../../assets/icons/messages-blue.svg")
				: require("../../assets/icons/messages.svg"),
			Profile: isFocused
				? require("../../assets/icons/profile-blue.svg")
				: require("../../assets/icons/profile.svg")
		}),
		[isFocused]
	)

	// Memoize the icon source based on the label and icon map
	const iconSource = useMemo(() => {
		return iconMap[label as keyof typeof iconMap]
	}, [label, iconMap])

	// Memoized callback for handling the press event
	const onPress = useCallback((): void => {
		// Emit the tabPress event with the target route key
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true
		})

		// If the tab is not focused and the event is not prevented, navigate to the route
		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params)
		}
	}, [isFocused, navigation, route])

	// Memoized callback for handling the long press event
	const onLongPress = useCallback((): void => {
		// Emit the tabLongPress event with the target route key
		navigation.emit({
			type: "tabLongPress",
			target: route.key
		})
	}, [navigation, route])

	return (
		// TouchableOpacity component for handling tab navigation interactions
		<TouchableOpacity
			// Accessibility props for screen readers
			accessibilityRole="button"
			accessibilityState={isFocused ? { selected: true } : {}}
			accessibilityLabel={options.tabBarAccessibilityLabel}
			testID={options.tabBarTestID}
			// Handle press and long press events
			onPress={onPress}
			onLongPress={onLongPress}
			style={[
				styles.navItemContainer,
				// Apply different styles based on focus state
				isFocused ? styles.selectedNavItem : styles.unSelectedNavItem
			]}
			key={route.name}
		>
			{/* Container for the navigation item's content */}
			<View style={styles.navItemTitleContainer}>
				{/* Icon for the navigation item */}
				<Image
					source={iconSource}
					style={styles.navIcon}
					contentFit="contain"
				/>
				{/* Text label for the navigation item */}
				<Text
					style={[
						styles.titleText,
						// Apply different text styles based on focus state
						isFocused
							? styles.selectedTitleText
							: styles.unSelectedTitleText
					]}
				>
					{/* Only render the label if it's a string */}
					{typeof label === "string" ? label : ""}
				</Text>
			</View>
			{/* Render the vertical indicator bar only when the item is focused */}
			{isFocused && <View style={styles.verticalBar} />}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	navItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: 65,
		width: "100%",
		borderRadius: 12.5,
		borderWidth: 1,
		paddingHorizontal: 6.5
	},
	selectedNavItem: {
		backgroundColor: "#F3F8FE",
		borderColor: "transparent"
	},
	unSelectedNavItem: {
		backgroundColor: "white",
		borderColor: "#F5F5F5"
	},
	navItemTitleContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 12.5,
		paddingLeft: 10
	},
	titleText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular"
	},
	selectedTitleText: {
		color: theme.colors.primary
	},
	unSelectedTitleText: {
		color: theme.colors.tertiary
	},
	navIcon: {
		height: 20,
		width: 20
	},
	verticalBar: {
		height: 32.5,
		width: 4,
		borderRadius: 2,
		backgroundColor: theme.colors.primary
	}
})
