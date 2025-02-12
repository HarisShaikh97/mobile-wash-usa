import { Stack } from "expo-router"

export default function Layout(): React.ReactElement | null {
	// Stack component for nested route content
	return <Stack screenOptions={{ headerShown: false }} />
}
