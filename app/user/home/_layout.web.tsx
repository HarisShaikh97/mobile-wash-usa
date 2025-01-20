import { Tabs } from "expo-router"
import SideNavWeb from "../../../components/side-nav-web/SideNavWeb"

export default function Layout(): React.ReactElement | null {
	return (
		// Tabs component with custom side navigation bar and hidden header
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <SideNavWeb {...props} />}
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
