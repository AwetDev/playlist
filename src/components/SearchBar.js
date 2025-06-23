import React from 'react';

function SearchBar({value, onChange, onKeyDown, onSearch}) {
    const onSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                value={value} 
                onChange={onChange} 
                type="text"
                placeholder="Enter A Song, Album, or Artist"
                onKeyDown={onKeyDown}/>
            </form>
        </div>
    );
}

export default SearchBar;