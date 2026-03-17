import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar,AvatarFallback,AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger , PopoverContent} from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

function CompaniesTable() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableCell>
                <Avatar>
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cf9bPbrkwgi4ut6PScrrj9ZoZk3ic8G82A&s" />
                </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>18-09-200X</TableCell>
            <TableCell className="text-right cursor-pointer">
                <Popover>
                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                    <PopoverContent className="w-32">
                    <div>
                        <Edit2 className='flex items-center gap-2 w-fit cursor-pointer' />
                        <span>Edit</span>
                        
                    </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
