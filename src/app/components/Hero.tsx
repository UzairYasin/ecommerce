import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; 
import { MotionDiv, MotionH2, MotionP } from './MotionDiv';

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2, // Stagger children animations by 0.2 seconds
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <div className="relative xl:h-[700px] lg:h-[700px] md:h-[600px] sm:h-[500px] h-[450px] w-[100%] flex-wrap">
      <Image
        src="/hero.png"
        layout="fill"
        className="object-cover object-center md:object-left"
        alt="Hero Image depicting luxury watches"
      />
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ ease: 'easeInOut', duration: 0.5 }}
        viewport={{ amount: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <MotionH2
          variants={childVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase min:w-[55%] lg:w-[55%] w-[70%] max-w-[90%] text-center"
        >
          Discover Timeless Elegance with Our Luxury Watches
        </MotionH2>
        <MotionP
          variants={childVariants}
          className="text-sm sm:text-base md:text-lg mt-4 md:mt-8 min-w-[45%] lg:w-[40%] w-[60%] max-w-[80%] text-center"
        >
          Explore our exclusive collection of luxury timepieces, where classic craftsmanship meets modern design. Elevate your style with watches that embody sophistication and innovation. Shop now and let your wrist tell a story of elegance.
        </MotionP>
        <MotionDiv variants={childVariants}>
          <Button className="my-5 rounded skeleton" variant="default" size="lg">
            <Link href="/products">
              <p>Buy Now</p>
            </Link>
          </Button>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default Hero;
