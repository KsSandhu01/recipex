import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as htmlToImage from 'html-to-image';
import dummyImage from '../assets/f.jpg'
import SaveButton from './SaveButton';
import SavedList from './SaveList';
import config from '../config';
import { isAuthenticatedKey } from '../services/auth';


const RecipeDetail = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [data, setData] = useState(null);
  const { id } = useParams()


  const handleSave = (item) => {
    // Check if the item is already saved
    const isAlreadySaved = savedItems.some((savedItem) => savedItem.id === item.id);

    if (!isAlreadySaved) {
      setSavedItems([...savedItems, item]);
    } else {
      // If already saved, remove it
      const updatedItems = savedItems.filter((savedItem) => savedItem.id !== item.id);
      setSavedItems(updatedItems);
    }
  };


  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    setSubmittedFeedback(feedback);

    setFeedback('');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFeedback(submittedFeedback);
  };

  const handleRemove = () => {
    setSubmittedFeedback('');
    setFeedback('');
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`  https://api.spoonacular.com/recipes/${id}/information?apiKey=${config.SA_KEY}`);
        const result = await response.json();
        console.log("resu", result)
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const isAuthenticated = JSON.parse(localStorage.getItem(isAuthenticatedKey) ?? 'false');
    setLoggedIn(isAuthenticated)
    fetchData();

  }, []);

  const downloadImage = () => {
    const element = document.getElementById('element-to-download');
    htmlToImage.toJpeg(element, { backgroundColor: '#ffffff', })
      .then(function (dataUrl) {
        console.log('dataUrl', dataUrl)
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = dataUrl;
        link.click();
      });
  };

  const shareOnWA = () => {
    const currentUrl = window.location.href;
    const whatsappMessage = `Check out this recipe of *${data.title.trim()}*: ${currentUrl}`;

    // Construct the WhatsApp URL with the pre-filled message
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(whatsappMessage)}`;

    // Open the WhatsApp app
    window.location.href = whatsappUrl;
  }

  const copyToClipboard = () => {
    const textToCopy = document.getElementById('element-to-download');

    if (textToCopy) {
      const range = document.createRange();
      range.selectNode(textToCopy);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "1200px", margin: "auto" }} className='detail-card'>
        <div className="card-wrapper " style={{ marginRight: "20px" }}>
          <div id='element-to-download' className="card" style={{ padding: 4 }}>

            <div className='d-flex justify-between'>
              <h1>{data?.title}</h1>

            </div>
            <div>
              <h3>Instructions :</h3>
              <p dangerouslySetInnerHTML={{ __html: data?.instructions }}></p>
            </div>
          </div>

          <button onClick={downloadImage}>Download</button>
          <button onClick={shareOnWA}>Share on Whatsapp</button>
          <button onClick={copyToClipboard}>Copy</button>

        </div>
        <div className="image-container">
          {

            isLoggedIn && <SaveButton item={data} onSave={handleSave} />
          }

          {/* <img src={data?.image} alt='image'  /> */}
          <img src={data?.image} alt="image" className='card-detail-image' />
        </div>
      </div>
      {

        isLoggedIn && (

          <>

            <div style={{ maxWidth: "1200px", margin: "auto", marginBottom: "2rem" }}>
              <p>Feedback :</p>
              <textarea
                rows="4"
                cols="50"
                placeholder='Write here...'
                value={feedback}
                onChange={handleFeedbackChange}

              ></textarea>
              <br />
              {isEditing ? (
                <>
                  <button onClick={handleSubmit} >Save Changes</button>
                  <button onClick={handleRemove} className='mr-3'>Remove Feedback</button>
                </>
              ) : (
                <button onClick={handleSubmit}>Submit Feedback</button>
              )}
              {submittedFeedback && (
                <div style={{ marginTop: "1rem" }}>
                  <div >

                    <p>{submittedFeedback}</p>
                    <button onClick={handleEdit} style={{ marginTop: ".5rem" }}>Edit </button>
                  </div>

                </div>
              )}
            </div>

          </>
        )
      }

    </>

  )
}

export default RecipeDetail