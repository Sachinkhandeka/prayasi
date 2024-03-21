import { Carousel } from 'flowbite-react';
import design1 from "../assets/blogPost/design1.png";
import design2 from "../assets/blogPost/design2.png";
import design3 from "../assets/blogPost/design3.png";
import design4 from "../assets/blogPost/design4.png";
import design5 from "../assets/blogPost/design5.png";
export default function CarouselCom() {
  return (
    <div className="h-60 sm:h-72 xl:h-80 2xl:h-96 mt-4 p-5">
      <Carousel slideInterval={5000}>
        <img src={design1} alt="design1" className='w-full h-full object-cover' />
        <img src={design2} alt="design2" className='w-full h-full object-cover' />
        <img src={design3} alt="design3" className='w-full h-full object-cover' />
        <img src={design4} alt="design4" className='w-full h-full object-cover' />
        <img src={design5} alt="design5" className='w-full h-full object-cover' />
      </Carousel>
    </div>
  );
}