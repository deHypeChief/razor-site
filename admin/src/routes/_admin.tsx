import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'
import { SectionCards } from '@/components/section-cards'

export const Route = createFileRoute('/_admin')({
	beforeLoad: async ({ context }) => {
		// Access auth from a global import or correct context property
		const authStatus = await context.auth.authStatus()
		if (!authStatus.isAuthenticated) {
			throw redirect({ to: '/' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<Outlet />

							<SectionCards />
							<div className="px-4 lg:px-6">
								{/* <ChartAreaInteractive /> */}
							</div>
							{/* <DataTable data={data} /> */}
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}


