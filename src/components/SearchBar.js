
import React, { useState } from 'react';  
import './components.css';


export default function SearchBar(props){

    const {items, setValidItems} = props;
    const [searchValue, setValue]  = useState(null);

    const controlSearch = (value)=>{

        const letters = value.split('');
        const lastLetter = letters[letters.length - 1];
        const alphaNumeric =/[a-zA-Z0-9']+/;

        const isAlphaNumeric = alphaNumeric.test(lastLetter)

        const removeLastItem = (arr)=>{return arr.slice(0,arr.length - 1)};

        const controlled = isAlphaNumeric ? value : removeLastItem(letters).join('');
        setValue(controlled);
    }


    return(
        <div className="search">
           <input  placeholder="Search for a model"  value={searchValue} onChange={(e)=>{
               const searchRegex = new RegExp(e.currentTarget.value, "gi");
               const matchingItems = items.filter((item)=>{
                    return searchRegex.test(item);
               });
               controlSearch(e.currentTarget.value);
               setValidItems(matchingItems);
            }}/> 
        </div>
    )

}


/*
name: "Doomsday Ark"
​​
points: 193
​​
quantity: 1
​​
weapons: {…}
​​​
    melee: Array []
​​​
    shooting: Array []
*/ 