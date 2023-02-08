import Image from 'next/image';
import React from 'react';

export default function Card(props) {
  return (
    <>


<div>
    
</div>


<div className="flex flex-row justify-center w-full bg-blue-lightest m-4">

    <div className='grid grid-rows-3 gap-3 grid-flow-col'>
        <div className='col-span-1 w-2 bg-black text-white'>1</div>
        <div className='col-span-1 w-2 bg-black text-white'>2</div>
        <div className='col-span-1 w-2 bg-black text-white'>3</div>
        <div className='col-span-1 w-2 bg-black text-white'>4</div>
        <div className='col-span-1 w-2 bg-black text-white'>5</div>
        

    </div>

        {/* <div className="flex bg-white max-w-32 max-h-56 rounded shadow-md text-grey-darkest">
        <Image className='rounded-l-sm ' src={props.poster_path} height={250} width={167} alt={props.title} /> */}

            
            {/* <div className="flex flex-row flex-wrap">
                <div className="p-2 pb-0 flex-1 max-w-xl">
                    <h3 className="flex flex-row flex-wrap max-w-32 font-extrabold mb-1 text-grey-darkest">{props.original_title}</h3>
                    <div className="text-xs flex items-center mb-4">
                        <i className="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                        {props.overview}
                    </div>
                    <span className="text-3xl text-grey-darkest">Average Review: <span className="text-2xl font-extrabold">{ props.vote_average} </span></span>
                    <div className="flex items-center mt-4">
                        <div className="pr-2 text-xs">
                        
                            <i className="fas fa-wifi text-green"></i> # Reviews: {new Intl.NumberFormat().format(props.vote_count)}
                        </div>
                        <div className="px-2 text-xs">
                            <i className="text-grey-darker far fa-building"></i> Release Year: { props.release_date.slice(0,4) }
                        </div>
                    </div>
                </div>
                <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light italic">
                    RATE NOW
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div> */}
        {/* </div> */}
    </div>
    </>
  );
}
