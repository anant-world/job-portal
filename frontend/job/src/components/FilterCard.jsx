import React from 'react'
import { RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { RadioGroupItem } from '@radix-ui/react-radio-group'


const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR ", "Bangalore","Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","FullStack Developer"]
    },
    {
        filterType:"Location",
        array:["0-48k ", "48-1lpa","1 to 5 lpa"]
    }
]
function FilterCard() {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h3 className='font-bold text-lg'>Filter Jobs</h3>
      <hr className='mt-3' />
      <RadioGroup>
        {
            filterData.map((data, index)=>(
                <div key={index}>
                    <h3 className='font-bold text-lg'>{data.filterType}</h3>
                    {
                        data.array.map((item, index)=>{
                            return (
                                <div key={item} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={item} />
                                   <Label htmlFor={item} >{item}</Label>
                                   
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
