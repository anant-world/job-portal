import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Design",
    "FullStack Developer"
]

function CategoryCarousel() {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20 overflow-visible">
                <CarouselContent className="items-stretch">
                    {
                        category.map((cat) => (
                            <CarouselItem
                                key={cat}
                            className="md:basis-1/2 lg:basis-1/3 h-full p-4"
                            >
                                <Button className="rounded-full">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
