import { useEffect, useRef } from "react";
import { SearchResultsProps } from "../../interfaces/interfaces";
import { highlightText } from "../../utils/helper";

const SearchResult = ({ results, query, highlightedIndex, setHighlightedIndex,isKeyboardNav,setIsKeyboardNav }:SearchResultsProps) => {
    const refs = useRef<HTMLDivElement[]>([]);
  
    useEffect(() => {
      if (highlightedIndex !== -1 && refs.current[highlightedIndex]) {
        refs.current[highlightedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, [highlightedIndex]);
    
    const handleMouseEnter = (index: number) => {
        if (!isKeyboardNav) {
          setHighlightedIndex(index);
        }
    };

    return (
      <div className="search-result-container">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div 
              key={item.id} 
              className={`card ${index === highlightedIndex ? 'highlighted' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => setIsKeyboardNav(false)}
              ref={(el) => refs.current[index] = el!}
            >
               <p>{ query.length > 0 ? highlightText(item?.id,query):item?.id}</p>
               <p>{query.length > 0 ? highlightText(item?.name,query):item?.name}</p>
               {query.length > 0 && <ul>
                 {item?.items?.map((itemsOption:string)=>{ return itemsOption?.toLowerCase().includes(query?.toLowerCase()) && <li> <span style={{color:'blue'}}>"{query.toLowerCase()}"</span> found in items</li>})}
               </ul>}
               <p>{query.length > 0 ?highlightText(item?.address,query):item?.address}</p>
            </div>
          ))
        ) : (
          <div className="card empty">No User Found</div>
        )}
      </div>
    );
  };


  export default SearchResult;