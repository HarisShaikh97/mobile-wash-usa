import { Stack } from "expo-router"

export default function Layout(): React.ReactElement | null {
	// Stack component with header hidden
	return <Stack screenOptions={{ headerShown: false }} />
}
