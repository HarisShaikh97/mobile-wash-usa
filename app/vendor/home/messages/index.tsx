import { View, Text, StyleSheet } from "react-native"
import { usePathname } from "expo-router"

export default function Tab(): React.ReactElement | null {
	const pathname = usePathname()

	return (
		<View>
			<Text>{pathname}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
