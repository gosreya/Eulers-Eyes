import React, { useState } from 'react';

const QuestionForm = () => {
    const [formData, setFormData] = useState({
      category: '',
      topic: '',
      question: '',
      answer: '',
      variables: [''], // Initial empty value
      variations: 1,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handlevariableChange = (index, value) => {
      const newvariables = [...formData.variables];
      newvariables[index] = value;
      setFormData({
        ...formData,
        variables: newvariables,
      });
    };
  
    const handleAddvariable = () => {
      setFormData({
        ...formData,
        variables: [...formData.variables, ''],
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Perform POST request to the "/createquestions/" endpoint
      try {
        const response = await fetch('/createquestion/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // Handle success, e.g., redirect or show a success message
          console.log('Question submitted successfully!');
        } else {
          // Handle error, e.g., show an error message
          console.error('Error submitting question:', response.status);
        }
      } catch (error) {
        console.error('Error submitting question:', error.message);
      }

      setFormData({
        category: '',
        topic: '',
        question: '',
        answer: '',
        variables: [''], // Initial empty value
        variations: 1,
      });
    };
  
    return (
      <div className='content' stlye={{paddingTop:-100}}>
          <h2>Add Templated Questions</h2>
          <div className='content'>
            <form onSubmit={handleSubmit}>
              <div className="grid-container">
                <div className="grid-item">
                  <label>Category:</label>
                </div>
                <div className="grid-item">
                  <textarea type="text" name="category" value={formData.category} onChange={handleChange} required />
                </div>

                <div className="grid-item">
                  <label> Topic:</label>
                </div>

                <div className="grid-item">
                  <textarea type="text" name="topic" value={formData.topic} onChange={handleChange} required />
                </div>
                
                <div className="grid-item">
                  <label>Question:</label>
                </div>

                <div className="grid-item">
                  <textarea name="question" value={formData.question} onChange={handleChange} required />
                </div>

                <div className="grid-item">
                  <label>Answer:</label>
                </div>

                <div className='grid-item'>
                  <textarea name="answer" value={formData.answer} onChange={handleChange} required />
                </div> 

                <div className='grid-item'>
                </div>
                <div className='grid-item'>
                  <button type="button" onClick={handleAddvariable} className='custom-button'>
                      Add Variable
                  </button>
                </div>
                
                <div className="grid-item">
                  <label> Variables:</label>
                </div>
                <div className="grid-item">
                    {formData.variables.map((variable, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={variable}
                          onChange={(e) => handlevariableChange(index, e.target.value)}
                          style={{margin:'5px'}}
                          required
                        />
                      </div>
                    ))}
                  </div>


                <div className="grid-item">
                  <label>Variations:</label>
                </div>
                <div className="grid-item">
                  <input
                    type="number"
                    name="variations"
                    value={formData.variations}
                    onChange={handleChange}
                    required
                  />
                </div>
                      
                <div className="grid-item"><button type="submit" className='custom-button'>Submit</button></div> 
            </div>
          </form>
          </div>
          
      </div>
    );
  };
  
  export default QuestionForm;