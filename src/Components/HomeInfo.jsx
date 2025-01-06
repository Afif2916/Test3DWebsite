import React from "react";
import { Link } from "react-router-dom";


const HomeInfo = ({ current }) => {
    if (current === 1)
      return (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
          Halo Nama Saya
          <span className='font-semibold mx-2 text-white'>Afif</span>
          👋
          <br />
          Saya Adalah Seorang Software Engineer
        </h1>
      );
  
    if (current === 2) {
      return (
        <div className='info-box'>
          <p className='font-medium sm:text-xl text-center'>
            Worked with many companies <br /> and picked up many skills along the way
          </p>
  
          <Link to='/about' className='neo-brutalism-white neo-btn'>
            Learn more
            
          </Link>
        </div>
      );
    }
  
    if (current === 3) {
      return (
        <div className='info-box'>
          <p className='font-medium text-center sm:text-xl'>
            Led multiple projects to success over the years. <br /> Curious about the impact?
          </p>
  
          <Link to='/project' className='neo-brutalism-white neo-btn'>
            Visit my portfolio
          </Link>
        </div>
      );
    }
  
    if (current === 4) {
      return (
        <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
        </p>
  
        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Let's talk
        
        </Link>
      </div>
      );
    }
  
    return null;
  };
  

export default HomeInfo