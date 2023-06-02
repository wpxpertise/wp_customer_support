import React, {useState, useEffect} from "react"
import axios from "axios";
import "./customcss.scss";



const CustomCss = () => {
  
  const [fields, setFields] = useState([]);
  const [dragform, setDragForm] = useState([]);
  const [formCreated, setFormCreated] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const handleDragStart = (event, field) => {
    setCurrentField(field);
  };

  const handleDragEnd = () => {
    setCurrentField(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (currentField) {
      const newFields = [...fields, { ...currentField, id: Date.now() }];
      setFields(newFields);
    }
  };

  const handleDeleteField = (fieldId) => {
    const newFields = fields.filter((field) => field.id !== fieldId);
    setFields(newFields);
  };

  const handleCodeGeneration = () => {
    const fieldsJson = JSON.stringify(fields);
    setDragForm(fieldsJson);
    console.log(fieldsJson);
  };

  /* const handleCreateForm = () => {
    const form = document.createElement('form');
    form.id = 'my-form';
    
    dragform.forEach(field => {
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.className = field.class;
      
      form.appendChild(input);
    });
    
    document.body.appendChild(form);
  }; */

  const handleCreateForm = () => {
    const formContainer = document.createElement('div');
    formContainer.id = 'form-container';
  
    const form = document.createElement('form');
    form.id = 'my-form';
  
    fieldsJson.forEach(field => {
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.className = field.class;
  
      form.appendChild(input);
    });
  
    formContainer.appendChild(form);
    document.body.appendChild(formContainer);
  
    setFormCreated(true);
  };

  // Add a new button to remove the form
/*   const handleRemoveForm = () => {
    const formContainer = document.getElementById('form-container');
    if (formContainer) {
      formContainer.remove();
      setFormCreated(false);
    }
  }; */



  const handleMoveField = (id, direction) => {
    const index = fields.findIndex(field => field.id === id);
    if (index === -1) return;
  
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;
  
    swapFields(index, newIndex);
  };
  
  const swapFields = (index1, index2) => {
    const newFields = [...fields];
    [newFields[index1], newFields[index2]] = [newFields[index2], newFields[index1]];
    setFields(newFields);
  };



  const inputFields = [
    { label: 'Text', type: 'text' },
    { label: 'Email', type: 'email' },
    { label: 'Password', type: 'password' },
  ];

  return (
    <div className="container">
      <div className="input-fields-container">
        <h2>Input Fields</h2>
        {inputFields.map((field, index) => (
          <div
            key={index}
            className="input-field"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, field)}
            onDragEnd={handleDragEnd}
          >
            {field.label}
          </div>
        ))}
      </div>
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >


        <h2>Form Builder</h2>
        {fields.map((field) => (
          <div key={field.id} className="form-field">
            <div className="form-field-header">
              <span className="field-label">{field.label}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteField(field.id)}
              >
                Delete
              </button>

              <button
                className="move-up-button"
                onClick={() => handleMoveField(field.id, 'up')}
                // disabled={index === 0}
              >
                Move Up
              </button>
              <button
                className="move-down-button"
                onClick={() => handleMoveField(field.id, 'down')}
                // disabled={index === fields.length - 1}
              >
                Move Down
              </button>

            </div>
            <div className="form-field-content">
              <label>
                ID:
                <input
                  type="text"
                  value={field.id}
                  onChange={(event) =>
                    setFields(
                      fields.map((f) =>
                        f.id === field.id ? { ...f, id: event.target.value } : f
                      )
                    )
                  }
                />
              </label>
              <label>
                Class:
                <input
                  type="text"
                  value={field.class}
                  onChange={(event) =>
                    setFields(
                      fields.map((f) =>
                        f.id === field.id
                          ? { ...f, class: event.target.value }
                          : f
                      )
                    )
                  }
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  value={field.name}
                  onChange={(event) =>
                    setFields(
                      fields.map((f) =>
                        f.id === field.id
                          ? { ...f, name: event.target.value }
                          : f
                      )
                    )
                  }
                />
              </label>
              <label>
                Placeholder:
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(event) =>
                    setFields(
                      fields.map((f) =>
                      f.id === field.id
                      ? { ...f, placeholder: event.target.value }
                      : f
                    ))}
                />
                </label>
                   </div>
                      </div>
                      ))}
                      <div className="code-generator">
                      <button onClick={handleCodeGeneration}>Generate Code</button>
                      <button onClick={handleCreateForm}>Create Form</button>
                    </div>
                 </div>
              </div>
        );
    }


export default CustomCss

/**
<div className="wcs_add_mail" id="wcs_add_mail">
      <div className="wcs_mails_container">

          <div className="wcs_top">
              <h1 className="setting_panel">GMAIL Setting -<a target="_blank" href="https://smtpjs.com/">SMTPJS.COM</a></h1>
          </div>
          <div className="wcs_bottom" id='wcs_bottom'>
          <div>
              <h2>Custom CSS</h2>
                
            </div>
          </div>
        </div>
        </div>
 */