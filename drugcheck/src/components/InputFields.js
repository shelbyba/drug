import React, { useState } from 'react';
import axios from 'axios';
import './InputFields.css';

const InputFields = () => {
  const [newDrug, setNewDrug] = useState('');
  const [interactionResult, setInteractionResult] = useState('');

  const handleNewDrugChange = (event) => {
    setNewDrug(event.target.value);
  };

  const handleDrugCheck = async () => {
    const trimmedDrugName = newDrug.trim();
  
    
    if (trimmedDrugName === '') {
      setInteractionResult({
        drug: '',
        interaction: 'Enter a valid drug name.',
      });
    } else {
      try {
        // Fetch drug information from the new API
        const url = `https://drug-info-and-price-history.p.rapidapi.com/1/druginfo?drug=${trimmedDrugName}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '68e0c23431msh12720205c98faa6p15ed5bjsn417519be571c',
            'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com',
          },
        };
  
        const response = await fetch(url, options);
        const data = await response.json();
  
        if (data.length > 0) {
          const lastInformation = data[data.length - 1];
          const pharmClasses = lastInformation['pharm_class'];
  
          
          if (Array.isArray(pharmClasses)) {
            setInteractionResult({
              drug: trimmedDrugName,
              interaction: `Pharmacological Classes: ${pharmClasses.join(', ')}`,
            });
          } else {
            setInteractionResult({
              drug: trimmedDrugName,
              interaction: 'Pharmacological Classes data not available.',
            });
          }
        } else {
          setInteractionResult({
            drug: trimmedDrugName,
            interaction: 'No information found for the drug.',
          });
        }
      } catch (error) {
        console.error('Error while fetching drug information:', error.message);
        setInteractionResult({
          drug: trimmedDrugName,
          interaction: 'An error occurred while fetching drug information',
        });
      }
    }
  };
  

  return (
    <div className="input-fields">
      {/* Left Section */}
      <div>
        <h2>Insert New Drug</h2>
        <input
          type="text"
          value={newDrug}
          onChange={handleNewDrugChange}
          placeholder="Enter the name of the new drug"
        />

        <button className="drug-check-btn" onClick={handleDrugCheck}>
          DrugCheck
        </button>
      </div>

      {/* Right Section */}
      <div className="answer-container">
        <h2 className="answer-title">GOOD TO KNOW</h2>
        {/* Display the answer generated */}
        {interactionResult ? (
          <pre>
            {interactionResult.interaction ? interactionResult.interaction : 'Loading...'}
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default InputFields;

