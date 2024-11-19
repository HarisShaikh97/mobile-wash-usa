import { useMemo, useCallback } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native"
import { theme } from "../../utils/constants"

interface NavItemProps extends BottomTabBarProps {
	route: RouteProp<{ [key: string]: object | undefined }, string>
	index: number
}

export default function NavItem({
	state,
	descriptors,
	navigation,
	route,
	index
}: NavItemProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf")
	})

	const options = useMemo(() => {
		return descriptors[route.key].options
	}, [descriptors, route.key])

	const label = useMemo(() => {
		return options.tabBarLabel !== undefined
			? options.tabBarLabel
			: options.title !== undefined
			? options.title
			: route.name
	}, [options, route.name])

	const isFocused = useMemo(() => state.index === index, [state.index, index])

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

	const iconSource = useMemo(() => {
		return iconMap[label as keyof typeof iconMap]
	}, [label, iconMap])

	const onPress = useCallback((): void => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true
		})

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params)
		}
	}, [isFocused, navigation, route.key, route.name, route.params])

	const onLongPress = useCallback((): void => {
		navigation.emit({
			type: "tabLongPress",
			target: route.key
		})
	}, [navigation, route.key])

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={isFocused ? { selected: true } : {}}
			accessibilityLabel={options.tabBarAccessibilityLabel}
			testID={options.tabBarButtonTestID}
			onPress={onPress}
			onLongPress={onLongPress}
			style={[
				styles.navItemContainer,
				index === 1 && styles.secondNavItemContainer,
				index === 2 && styles.thirdNavItemContainer
			]}
			key={route.name}
		>
			<Image
				source={iconSource}
				style={styles.navIcon}
				contentFit="contain"
			/>
			{fontsLoaded && (
				<Text
					style={[
						styles.titleText,
						isFocused
							? styles.selectedTitleText
							: styles.UnSelectedTitleText
					]}
				>
					{typeof label === "string" ? label : ""}
				</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	navItemContainer: {
		flexDirection: "column",
		gap: 3.5,
		alignItems: "center",
		width: 100
	},
	secondNavItemContainer: {
		paddingRight: 30
	},
	thirdNavItemContainer: {
		paddingLeft: 30
	},
	titleText: {
		fontSize: 8.5,
		fontFamily: "Montserrat-SemiBold"
	},
	selectedTitleText: {
		color: theme.colors.primary
	},
	UnSelectedTitleText: {
		color: theme.colors.tertiary
	},
	navIcon: {
		height: 20,
		width: 20
	}
})
