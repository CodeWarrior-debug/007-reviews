import React from 'react';

export default function Card(props) {
  return (
    <>
<div class="flex flex-row justify-center max-h-64 w-full bg-blue-lightest m-4">
        <div class="flex bg-white max-w-32 max-h-56 rounded shadow-md text-grey-darkest">
            <img class="w-28 rounded-l-sm" src={props.poster_path} alt=""/>
            <div class="flex flex-row flex-wrap">
                <div class="p-2 pb-0 flex-1 max-w-xl">
                    <h3 class="flex flex-row flex-wrap max-w-32 font-extrabold mb-1 text-grey-darkest">{props.original_title}</h3>
                    <div class="text-xs flex items-center mb-4">
                        <i class="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                        {props.overview}
                    </div>
                    <span class="text-3xl text-grey-darkest">Average Review: <span class="text-2xl font-extrabold">{ props.vote_average} </span></span>
                    <div class="flex items-center mt-4">
                        <div class="pr-2 text-xs">
                        
                            <i class="fas fa-wifi text-green"></i> # Reviews: {new Intl.NumberFormat().format(props.vote_count)}
                        </div>
                        <div class="px-2 text-xs">
                            <i class="text-grey-darker far fa-building"></i> Release Year: { props.release_date.slice(0,4) }
                        </div>
                    </div>
                </div>
                <div class="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light italic">
                    RATE NOW
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
