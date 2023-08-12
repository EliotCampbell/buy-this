import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import classes from './CarouselBlock.module.css'
import Image from 'next/image'
import bigProm1 from '@/public/BigProm1.jpg'
// import bigProm2 from '@/public/BigProm2.jpg'
// import bigProm3 from '@/public/BigProm3.jpg'
import picture2 from '@/public/Untitled - Copy.jpg'

const CarouselBlock = () => {
  return (
    <div className={classes.carouselBlock}>
      <div className={classes.carousel}>
        {/*<Carousel
            showArrows={true}
            autoPlay={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            interval={10000}
            width={950}
          >
            <div>
              <Image src={bigProm1} alt={''} />
            </div>
            <div>
              <Image src={bigProm2} alt={''} />
            </div>
            <div>
              <Image src={bigProm3} alt={''} />
            </div>
          </Carousel>*/}
        <div>
          <Image src={bigProm1} alt={''} />
        </div>
      </div>
      <div className={classes.platesBlock}>
        <Image src={picture2} alt={''} />
        <Image src={picture2} alt={''} />
        <Image src={picture2} alt={''} />
      </div>
    </div>
  )
}

export default CarouselBlock
