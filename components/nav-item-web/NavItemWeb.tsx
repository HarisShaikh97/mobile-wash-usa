import { useMemo, useCallback } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native"
import { theme } from "../../utils/constants"

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
			testID={options.tabBarTestID}
			onPress={onPress}
			onLongPress={onLongPress}
			style={[
				styles.navItemContainer,
				isFocused ? styles.selectedNavItem : styles.unSelectedNavItem
			]}
			key={route.name}
		>
			<View style={styles.navItemTitleContainer}>
				<Image
					source={iconSource}
					style={styles.navIcon}
					contentFit="contain"
				/>
				<Text
					style={[
						styles.titleText,
						isFocused
							? styles.selectedTitleText
							: styles.unSelectedTitleText
					]}
				>
					{typeof label === "string" ? label : ""}
				</Text>
			</View>
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
		paddingHorizontal: 5
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
