import { useState, useRef, useEffect } from "react";
import NoImage from '../public/images/noimageavailable.png'

const SearchAutocomplete = ({ items = [], onSelect, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Ensure items is always an array and not undefined
    setShowDropdown(Array.isArray(items) && items.length > 0);
  }, [items]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value,"value");
    
    setSearchTerm(value);
    if (onChange) onChange(value); // ✅ Pass the search term instead of the event
  };
  const highlightSearchString = (text) => {
    if (!text) return null; // Guard clause: Return null if text is undefined or empty
    if (!searchTerm) return text; // If no search term, return plain text
  
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search For “Skin Care”"
        className="form-control border-0"
      />
      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-menu show" style={{ width: "50%",minWidth:"300px",maxHeight:"50%",overflow:"auto",padding: "2px 0px",boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 12px",borderRadius: "3px",position: "fixed",fontWeight: "500",backgroundColor: "#fff"}}>
          {items.map((section, index) => (
            <div key={index}>
              <div style={{ fontWeight: "bold", padding: "5px" }}>
                {section.type}
              </div>
              <hr />
              {section.data.map((item, idx) => (
                <div
                  key={idx}
                  className="dropdown-item"
                  onClick={() => onSelect(item,section.type)}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px" }}
                >
                  {/* {item.product_images && (
                    <img src={item.product_images[0].image} alt={item.name} style={{ width: "30px", height: "30px", marginRight: "10px" }} />
                  )} */}
                  {item.product_images && item.product_images.length > 0 ? (
                        <img src={item.product_images[0].image} alt={item.name} style={{ width: "30px", height: "30px", marginRight: "10px" }} />
                    ) : (
                        <img src="" />
                    )}
                  <span>{highlightSearchString(item.name) || highlightSearchString(item.vendor_article_name)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
