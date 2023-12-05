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
        ...formData,
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
                  <label for="category">Category:</label>
                </div>
                <div className="grid-item">
                    {<select id="category" name="category" onChange={handleChange} required>
                      <option value="" selected={true} disabled>Select A Category</option>
                      <option value="Algebra">Algebra</option>
                      <option value="Precalculus">Precalculus</option>
                      <option value="Calculus">Calculus</option>
                    </select>}
                </div>

                <div className="grid-item">
                  <label> Topic:</label>
                </div>
                <div className="grid-item">
                  {/* <textarea type="text" name="topic" value={formData.topic} onChange={handleChange} required /> */}
                  {formData['category'] === '' && 
                  <div></div>
                  }
                  {formData['category'] === 'Algebra' && 
                    <select id="topic" name="topic" onChange={handleChange} required>
                      <option value="" disabled selected={true}>Select A Topic</option>
                      <option value="Equations">Equations</option>
                      <option value="Polynomials">Polynomials</option>
                    </select>
                  }
                  {formData['category'] === 'Precalculus' && 
                    <select id="topic" name="topic" onChange={handleChange} required>
                      <option value="" disabled selected={true}>Select A Topic</option>
                      <option value="Trigonometry">Trigonometry</option>
                    <option value="Functions">Functions</option>
                  </select>
                  }
                  {formData['category'] === 'Calculus' && 
                    <select id="topic" name="topic" onChange={handleChange} required>
                      <option value="" disabled selected={true}>Select A Topic</option>
                      <option value="Integrals">Integrals</option>
                    <option value="Differentiation">Differentiation</option>
                  </select>
                  }
                </div>
                
                <div className="grid-item">
                  <label>Question:</label>
                </div>

                <div className="grid-item">
                  <textarea name="question" value={formData.question} onChange={handleChange} required placeholder='LaTeX format example: \(6 = <m> * x + <b> \)'/>
                </div>

                <div className="grid-item">
                  <label>Answer:</label>
                </div>

                <div className='grid-item'>
                  <textarea name="answer" value={formData.answer} onChange={handleChange} required placeholder='Example: (6 - <b>) / <m>' />
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
                          placeholder='var min max'
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
                    style={{marginLeft:'4px'}}
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