import React from 'react'

const RenderedInput = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export const RenderedNumberInput = ({ input, label, placeholder, step, pattern, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type="number"
      step={step} pattern={pattern}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export default RenderedInput