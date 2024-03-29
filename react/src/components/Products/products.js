import { useEffect, useState } from "react";
import ListItem from "./Listitems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";

const Products = ({ onAddItem, onRemoveItem, eventState }) => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          `https://react-learning-7c870-default-rtdb.firebaseio.com/items.json`
        );
        const data = response.data;
        const transformData = data.map((item, index) => {
          return {
            ...item,
            quantity: 0,
            id: index,
          };
        });
        // setLoader(false);
        setItems(transformData);
      } catch (error) {
        setLoader(false);
        console.log(error);
        alert("Some error occurred!");
      } finally {
        setLoader(false);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    if (eventState.id >= -1) {
      if (eventState.type === 1) {
        handleAddItem(eventState.id);
      } else if (eventState.type === -1) {
        handleRemoveItem(eventState.id);
      }
    }
  }, [eventState]);

  const updateItemTitle = async (itemId) => {
    console.log(`Item with Id: ${itemId}`);
    try {
      let title = `Update title #Item-${itemId}`;
      await axios.patch(
        `https://react-learning-7c870-default-rtdb.firebaseio.com/items/${itemId}.json`,
        {
          title: title,
        }
      );
      let data = [...items];
      let index = data.findIndex((e) => e.id === itemId);
      data[index]["title"] = title;
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = (id) => {
    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    data[index].quantity += 1;
    setItems([...data]);
    onAddItem(data[index]);
  };
  const handleRemoveItem = (id) => {
    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    if (data[index].quantity !== 0) {
      data[index].quantity -= 1;
      setItems([...data]);
      onRemoveItem(data[index]);
    }
  };

  return (
    <>
      <div className={"product-list"}>
        <div className={"product-list--wrapper"}>
          {items.map((item) => {
            return (
              <ListItem
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                key={item.id}
                data={item}
                updateItemTitle={updateItemTitle}
              />
            );
          })}
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Products;
