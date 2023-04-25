import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'

export const exists = (object, falseValue = null, trueValue = null) =>
  typeof object !== 'undefined' && object
    ? (trueValue !== null ? trueValue : object)
    : falseValue

export const FormItem = ({
  formik = {}, name = '',
  label = '', inputType = '', children, required = false,
  readMode = false, specialInstruction = '',
  ...rest
}) => {
  const renderLabel = (required && !readMode)
    ? (<span className='ant-form-item-label'>
      <label className='ant-form-item-required'>
        {label}
      </label>
    </span>)
    : (<span className='ant-form-item-label'>
      <label>{label}</label>
    </span>)

  const labelCol = exists(rest.labelCol, { span: 24 })
  const labelAlign = exists(rest.labelAlign)
  const wrapperCol = exists(rest.wrapperCol, { span: 24 })
  const hasFeedback = exists(rest.hasFeedback, false)

  let help = ''
  let validateStatus = ''
  if (formik.touched[name] && typeof formik.errors[name] !== 'undefined') {
    help = formik.errors[name]
    validateStatus = 'error'
  }

  const childComponent = children({
    name,
    onChange: value => {
      if (inputType) {
        if (inputType === 'number') {
          const v = value.target.value
          if (!isNaN(v)) {
            formik.setFieldValue(name, v)
            formik.handleChange(v)
          }
        }
      } else {
        if (typeof value === 'string') {
          formik.setFieldValue(name, value)
        }
        formik.handleChange(value)
      }
    },
    onBlur (e) {
      formik.setFieldTouched(name, true)
      formik.handleBlur(e)
    },
    value: formik.values[name],
    required
  })

  return (
    <Form.Item
      {...rest}
      labelCol={labelCol}
      labelAlign={labelAlign}
      wrapperCol={wrapperCol}
      hasFeedback={hasFeedback}
      label={label ? renderLabel : ''}
      help={readMode === false ? help : ''}
      validateStatus={readMode === false ? validateStatus : ''}
    >
      {readMode === false ? childComponent : (formik.values[name] || '-')}
      {!validateStatus && specialInstruction && <span style={{ fontSize: '10px', color: '#00263D' }}>{specialInstruction}</span>}
    </Form.Item>
  )
}

FormItem.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
  children: PropTypes.any,
  required: PropTypes.bool,
  readMode: PropTypes.bool,
  specialInstruction: PropTypes.string
}

export const FormLabel = ({ text = '', required = false }) => (
  <div className='ant-form-item-label'>
    <label className='' title=''>
      <span className='ant-form-item-label'>
        {!required ? text : (<label className='ant-form-item-required'>{text}</label>)}
      </span>
    </label>
  </div>
)

FormLabel.propTypes = {
  text: PropTypes.string,
  required: PropTypes.bool
}

export const FormReadOnlyItem = ({ value, text = '', required = false }) => (
  <div style={{ marginBottom: 8 }}>
    <FormLabel text={text} required={required} />
    <div className='ro-value-div'>
      {value || '-'}
    </div>
  </div>
)

FormReadOnlyItem.propTypes = {
  value: PropTypes.any,
  text: PropTypes.string,
  required: PropTypes.bool
}

export const FormError = ({ touched, errors, name }) => (
  <>
    {typeof touched[name] !== 'undefined' && touched[name] && typeof errors[name] !== 'undefined' && errors[name] && (
      <div className='ant-form-item-explain ant-form-item-explain-error'>
        <div role='alert'>{errors[name]}</div>
      </div>
    )}
  </>
)

FormError.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string
}
