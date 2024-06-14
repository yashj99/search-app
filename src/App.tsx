import { useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import './App.css';
import { DataItem } from './interfaces/interfaces';
import SearchResult from './components/search-result/SearchResult';


const App = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);

  const [isKeyboardNav, setIsKeyboardNav] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: DataItem[]) => {
        setData(data);
        setLoading(false);
        setHighlightedIndex(0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setHighlightedIndex(-1);
  };

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if( event.key === 'ArrowDown' || event.key === 'ArrowUp'){
      event.preventDefault();
      setIsKeyboardNav(true); 
    }
    if (event.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredResults.length);
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + filteredResults.length) % filteredResults.length);
    }
  };

  const filteredResults = data.filter(item =>
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className='main-container' onKeyDown={handleKey} tabIndex={0} style={{ outline: 'none' }}>
      <input 
        className='search-input'
        type="text" 
        value={query} 
        onChange={handleSearch} 
        placeholder="Search users by id, address, name, pincode and items" 
      />
      {loading ? <div className="loader">Loading...</div> : (
        <SearchResult
          results={filteredResults} 
          query={query} 
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          isKeyboardNav={isKeyboardNav}
          setIsKeyboardNav={setIsKeyboardNav}
        />
      )}
    </div>
  );
};


export default App;
