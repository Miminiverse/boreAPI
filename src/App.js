import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { act } from 'react-dom/test-utils';


function App() {

  const [acts, setActs] = useState([]);
  const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) || []);

  const getData = async () => {
    const res = await axios.get(`https://www.boredapi.com/api/activity/`)
    if(!acts) return
    setActs([{
      activity: res.data.activity,
      type: res.data.type,
      key: res.data.key,
    }])
  }


  const addData = () => {
    if (lists) {
    setLists([...lists, {
      activity: acts[0].activity,
      type: acts[0].type,
      key: acts[0].key,
    }])
    }
  }

  const removeData = (list) => {
    setLists((currentLists) => currentLists.filter((item) => item.key !== list.key))
  }


  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])


  useEffect(() => {
    getData()
  }, [act])


  return (
    <>
        <h2>Bore API</h2>
        <button className="button" onClick={() => addData()} disabled={lists.length === 3}>
          Adding maximum 3 activities into list
        </button>
        <div className="row">
          <div className="column">
            <div className="button-column">
            <button type="button" onClick={getData}>
        <div className="text">
              {acts.map((item) => (
                <div key={item.key}>  
                  <h3>{item.activity}</h3>
                  </div> ))}
        </div>
    </button>
            </div>

          </div>
          <div className="column">
          <div className="list-column">
          <div className="list-text">
            <h3>Saved Activities</h3>
          {lists.map((list) => (
          <div key={list.key} className="item">
          <p>{list.activity}</p>
          <button className="buttonRemove" onClick={() => removeData(list)}>Remove</button>
          </div>
          ))}
    </div>
          </div>

          </div>

        </div>

    </>
  )}


export default App;


