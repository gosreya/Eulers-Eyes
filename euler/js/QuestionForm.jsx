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
        <div>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <textarea type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
  
        <label>
          Topic:
          <textarea type="text" name="topic" value={formData.topic} onChange={handleChange} required />
        </label>
  
        <label>
          Question:
          <textarea name="question" value={formData.question} onChange={handleChange} required />
        </label>
  
        <label>
          Answer:
          <textarea name="answer" value={formData.answer} onChange={handleChange} required />
        </label>
  
        <label>
          Variables:
          {formData.variables.map((variable, index) => (
            <div key={index}>
              <input
                type="text"
                value={variable}
                onChange={(e) => handlevariableChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddvariable}>
            Add Variable
          </button>
        </label>
  
        <label>
          Variations:
          <input
            type="number"
            name="variations"
            value={formData.variations}
            onChange={handleChange}
            required
          />
        </label>
  
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  };
  
  export default QuestionForm;