import { useState } from "react";
import './Header.css';


const Header = ()=>{

    const [apiLinks,setApiLinks] = useState([])
    const [apiLinksTexts,setApiLinksTexts] = useState([])

    const url = "https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=";
    
    const makeApiCall =(e)=>{
        let str = e.target.value
        fetch(url + str)
        .then(data=>data.json())
        .then(res=> {
            console.log(res);
            setApiLinks(res[3]);
            setApiLinksTexts(res[1]);
        })
    }

    var timer;

    const debounce =(e)=>{
        clearTimeout(timer);

        timer = setTimeout(()=>{
            console.log(e.target.value)
            makeApiCall(e) 
        }, 5000)
        // console.log(e.target.value);
        makeApiCall(e)
    }
    return(
        <div className = "Wrapper">
            <div className="container">
                <i class="fas fa-globe-europe"></i>
                <h1>WikiSearch</h1>
                <p>Search anything...</p>
                <br/>
                <input id="input" type = "text" onChange={debounce}/>
            </div>
            <div className = "container-two">
                {
                    apiLinks && apiLinksTexts.map((item,index)=>(
                        <>
                        <a id= "sugg" href ={apiLinks[index]} >{item}</a>
                        <br/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Header;