
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={()=>onClickHandler(index)}                  //use anonymous funtion here because we cannot update a component(WrappedListComponent) while rendering a different component (WrappedSingleListItem).
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex,setSelectedIndex] = useState(false);     // it is commaon practice to [selectedIndex,setSelectedIndex] in this way 

  useEffect(() => {
    setSelectedIndex(true);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(true);               //  this state should be boolean because proptype is boolean and here it is set to true
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem key={index}                                 //differentiate every element by adding index to key 
          onClickHandler={() => handleClick(index)}
          text={item}                                                 //item is enough no need for item.text
          index={index}
          isSelected={selectedIndex}    
        />
      ))}
    </ul>
  )
};

  WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType(       //checking every element in arary for string, so we have to use arrayOf and oneOfType 
      [PropTypes.string.isRequired]
    )),
  };




WrappedListComponent.defaultProps = {
  items: [],                                //default proptype should be array
};

const List = memo(WrappedListComponent);

export default List;

