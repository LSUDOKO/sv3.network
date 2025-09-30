'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { Home, User, Building2, FileText, PenTool, Settings, ChevronDown, Plus, Search } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const menuItems = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Organizations',
    url: '/dashboard/organizations',
    icon: Building2,
  },
  {
    title: 'Documents',
    url: '/dashboard/documents',
    icon: FileText,
  },
  {
    title: 'Signatures',
    url: '/dashboard/signatures',
    icon: PenTool,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { address } = useAccount()

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:sidebar-menu-item-active hover:bg-sidebar-accent/50 transition-all-300'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm'>
                    <span className='font-bold text-sm'>SV</span>
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold gradient-text'>sv3.network</span>
                    <span className='truncate text-xs text-muted-foreground'>Decentralized Signing</span>
                  </div>
                  <ChevronDown className='ml-auto size-4 text-muted-foreground' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/documents'>
                    <FileText />
                    <span>Documents</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/organizations'>
                    <Building2 />
                    <span>Organizations</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Plus />
                  <span>New Document</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Search />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size='lg' className='data-[state=open]:sidebar-menu-item-active'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-sidebar-foreground'>
                    {address ? (
                      <span className='text-sm font-medium'>{address.slice(2, 4).toUpperCase()}</span>
                    ) : (
                      <User className='size-4' />
                    )}
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
                    </span>
                    <span className='truncate text-xs'>{address ? 'Connected' : 'Connect Wallet'}</span>
                  </div>
                  <ChevronDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/profile'>
                    <User />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/settings'>
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export function SidebarProviderWrapper({ children }: { children: React.ReactNode }) {
  const [openCmd, setOpenCmd] = useState(false)
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-1 flex-col min-h-screen'>
          <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border/50 bg-background/95 backdrop-blur-sm'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1 hover:bg-muted/50 transition-all-300' />
              <div className='h-4 w-px bg-border' />
              <div className='flex items-center gap-2'>
                <h1 className='text-lg font-semibold'>Dashboard</h1>
              </div>
            </div>
            <div className='flex items-center gap-2 px-4'>
              <Button variant='outline' size='sm' onClick={() => setOpenCmd(true)} className='hidden md:flex'>
                <Search className='mr-2 size-4' />
                <span>Search</span>
                <CommandShortcut className='ml-2'>⌘K</CommandShortcut>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-6 p-6 pt-4 overflow-auto'>{children}</div>
        </div>
        <CommandDialog open={openCmd} onOpenChange={setOpenCmd}>
          <CommandInput placeholder='Search pages and actions...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Navigate'>
              {menuItems.map((item) => (
                <CommandItem
                  key={item.url}
                  onSelect={() => {
                    window.location.href = item.url
                  }}>
                  <item.icon className='mr-2 size-4' />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}