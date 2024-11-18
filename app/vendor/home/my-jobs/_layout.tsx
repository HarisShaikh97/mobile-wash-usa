import { Stack } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return <Stack screenOptions={{ headerShown: false }} />
}
