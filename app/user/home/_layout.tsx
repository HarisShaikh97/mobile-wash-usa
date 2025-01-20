import { Tabs } from "expo-router"
import BottomNav from "../../../components/bottom-nav/BottomNav"

export default function Layout(): React.ReactElement | null {
	return (
		// Tabs component with custom navigation bar and hidden header
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <BottomNav {...props} />}
		>
			{/* Home tab screen */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Home"
				}}
			/>
			{/* My Jobs tab screen */}
			<Tabs.Screen
				name="my-jobs"
				options={{
					title: "My Jobs"
				}}
			/>
			{/* Messages tab screen */}
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages"
				}}
			/>
			{/* Profile tab screen */}
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile"
				}}
			/>
		</Tabs>
	)
}
