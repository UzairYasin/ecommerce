"use client"
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'

const Page = () => {

  const [Users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('http://localhost:3000/api/users', {cache: 'no-store'});
      const users = await data.json();
      setUsers(users)
    }
    fetchUsers();
  }, [])

  return (
    <>
      <div className="flex w-full flex-col md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] mt-5">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-center w-[1000px] mx-auto gap-5 p-8 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1">
            <Card x-chunk="dashboard-05-chunk-3 ">
              <CardHeader className="px-7">
                <CardTitle className='text-lg'>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Name
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Role
                      </TableHead>
                      <TableHead>
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Users.map((user: any) => (
                      <TableRow className="" key={user.id}>
                        <TableCell>
                          <div className="font-medium max-w-[80px] truncate">{user.id}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.name}
                        </TableCell>
                        <TableCell >{user.email}</TableCell>
                        <TableCell >{user.role}</TableCell>
                        <TableCell >{
                          user.isVerified ?
                            (
                              <Badge className='text-xs w-fit' variant={'success'}>verified</Badge>
                            ) :
                            (
                              <Badge className='text-xs w-fit' variant={'destructive'}>not verified</Badge>
                            )
                        }</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  navigator.clipboard.writeText(user.id)
                                  toast.success("Id copied")
                                }}
                              >
                                Copy User ID
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}

export default Page
