import Image from 'next/image';
import React from 'react';
import Link from 'next/link'

export default function Card(props) {

    const {original_title,overview,poster_path,popularity, release_date,vote_average, vote_count} = props;


  return (
    <>

<Link 
href={`./filmography/${original_title}`}
>

<div className='grid grid-cols-8 max-w-32 gap-2 border-4 rounded-md border-gray-900 hover:border-double'>
    <div className='col-span-3 flex items-center' >
        {/* <Image className='rounded-l-sm ' src={poster_path} height={250} width={167} alt={original_title} /> */}
        <Image className='rounded-l-sm ' src={poster_path} height={500} width={333} alt={original_title} />


    </div>
    <div className='col-span-5'>  
        <h2 className='font-extrabold text-center '>
            {original_title}
            <br/>
            <div className='text-sm text-left indent-3 mt-2 mb-2 font-[600]'>
            {release_date} &emsp; &emsp; &emsp; &emsp; {vote_average.toFixed(1)} ⭐
            </div>
        </h2>
        <p className='overflow-clip h-32 text-sm leading-tight hover:overflow-y-auto p-2 pl-0'>
            {overview}
        </p>
        
        <div className='indent-4'>
            <span className='font-[600] '>Your review: ?</span>
        </div>
 
    </div>
    {/* <div className='col-span-1'>
        <span className='h-full align-middle'>Hi</span>
        
    </div> */}
</div>

</Link>




{/* <div className="flex flex-row justify-center w-full bg-blue-lightest m-4"> */}



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
    {/* </div> */}
    </>
  );
}
