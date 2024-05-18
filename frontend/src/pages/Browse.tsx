import BrowseCSS from '../pages/modules/Browse.module.css'
import { BrowseAuction } from '../components/browseauction'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/navbar'
import { Auction } from '../components/types/Auction.types'
export const Browse = () => {

    const [browseAuctions, setBrowseAuctions] = useState<Auction[]>([])
    const [allAuctions, setAllAuctions] = useState<Auction[]>([])
    const [query, setQuery] = useState<string>('')
    useEffect(() => {

        const originalDisplay = document.body.style.display;

        document.body.style.display = 'inline';
    
        return () => {
            document.body.style.display = originalDisplay;
        };
      }, []);
    
    async function getAllAuctions() 
    {
        const res = await axios.post("http://localhost:8000/auction/getAll")
        setBrowseAuctions(res.data.auctions)
        setAllAuctions(res.data.auctions)
        console.log(res.data.auctions)
    }

    const filteredItems = (query : string, items : Auction []) =>
    {
        if(!query)
        {
            return items;
        }
        return items.filter(auction => auction.title.includes(query))
    }

    async function handleClick()
    {
        await getAllAuctions()
        let filteredAuctions = filteredItems(query,allAuctions)
        setBrowseAuctions(filteredAuctions)
    }
    useEffect(()=>
    {
        getAllAuctions()
    },[])

    function handleChange(e : any)
    {
        setQuery(e.target.value)
        if(!e.target.value)
        {
            setBrowseAuctions(allAuctions)
        }
    }
    return (
        <div>
            
            <div className={BrowseCSS.container}>
                <Navbar/>
                <div className={BrowseCSS.search_container}>
                    <input value={query} type="text" placeholder="Search..." onChange={handleChange}/>
                    <button onClick={handleClick}>Search</button>
                </div>
                {browseAuctions.map(auction=> <BrowseAuction key={auction._id} auction={auction}/>)}
            </div>
        </div>
        
    )
}