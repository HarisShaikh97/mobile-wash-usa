import { Tabs } from "expo-router"
import BottomNav from "../../../components/bottom-nav/BottomNav"

export default function Layout(): React.ReactElement | null {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <BottomNav {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home"
				}}
			/>
			<Tabs.Screen
				name="my-jobs/index"
				options={{
					title: "My Jobs"
				}}
			/>
			<Tabs.Screen
				name="messages/index"
				options={{
					title: "Messages"
				}}
			/>
			<Tabs.Screen
				name="profile/index"
				options={{
					title: "Profile"
				}}
			/>
		</Tabs>
	)
}
