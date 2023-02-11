// import Axios from "axios";

// export async function BondMovieIds(){

     const movieIDs = async () =>{
        await fetch("https://api.themoviedb.org/3/collection/645?api_key=ef49b4888abc2e14ec134b8ae835513d"
        )
        .then((res)=>console.log(res.data))
        .catch((err)=>console.log(err))
    }


// }

movieIDs()