import { Tabs } from "expo-router"
import SideNavWeb from "../../../components/side-nav-web/SideNavWeb"

export default function Layout(): React.ReactElement | null {
	return (
		// Main navigation tabs container
		<Tabs
			screenOptions={{ headerShown: false }} // Hides the header
			tabBar={(props) => <SideNavWeb {...props} />} // Custom side navigation component
		>
			{/* Home screen tab */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Home"
				}}
			/>
			{/* Jobs management screen tab */}
			<Tabs.Screen
				name="my-jobs"
				options={{
					title: "My Jobs"
				}}
			/>
			{/* Messages/communication screen tab */}
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages"
				}}
			/>
			{/* User profile screen tab */}
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile"
				}}
			/>
		</Tabs>
	)
}
