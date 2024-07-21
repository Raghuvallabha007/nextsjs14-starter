"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/components/Dropdown.module.css';
import axios from 'axios';

const CustomSelectSearchWithApi = () => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadOptions();
  }, [searchTerm, page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

//   const loadOptions = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const filteredData = dummyData.filter(option =>
//         option.label.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const newOptions = filteredData.slice(0, page * 20);
//       setOptions(newOptions);
//       setHasMore(newOptions.length < filteredData.length);
//       setIsLoading(false);
//     }, 500); // Simulating network delay
//   };
const loadOptions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/options`, {
        params: { search: searchTerm, page },
      });
      const data = response.data;
      if (page === 1) {
        setOptions(data.options);
      } else {
        setOptions((prevOptions) => [...prevOptions, ...data.options]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.some(selected => selected.value === option.value)) {
        return prevSelected.filter(selected => selected.value !== option.value);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const renderSelectedOptions = () => {
    return selectedOptions.map(option => option.label).join(', ');
  };

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <input
        type="text"
        value={renderSelectedOptions()}
        readOnly
        placeholder="Select..."
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className={styles.optionsList} onScroll={handleScroll}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            autoFocus
          />
          {options.map((option, index) => (
            <div key={index} className={styles.eachOption}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.some(selected => selected.value === option.value)}
                  onChange={() => handleOptionClick(option)}
                />
                {option.label}
              </label>
            </div>
          ))}
          {isLoading && <div>Loading...</div>}
        </div>
      )}
      {/* <style jsx>{`
        .custom-select {
          position: relative;
          width: 200px;
        }

        .custom-select > input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .options-list {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ccc;
          background-color: #fff;
          position: absolute;
          width: 100%;
          z-index: 1;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin-top: 4px;
        }

        .options-list > input[type="text"] {
          width: calc(100% - 16px);
          padding: 8px;
          margin: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .option {
          padding: 8px;
          cursor: pointer;
        }

        .option label {
          display: flex;
          align-items: center;
        }

        .option input[type="checkbox"] {
          margin-right: 8px;
        }

        .option:hover {
          background-color: #f0f0f0;
        }
      `}</style> */}
    </div>
  );
};

export default CustomSelectSearchWithApi;

// const loadOptions = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(apiUrl, {
//         params: { search: searchTerm, page },
//       });
//       const data = response.data;
//       if (page === 1) {
//         setOptions(data.options);
//       } else {
//         setOptions((prevOptions) => [...prevOptions, ...data.options]);
//       }
//       setHasMore(data.hasMore);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
