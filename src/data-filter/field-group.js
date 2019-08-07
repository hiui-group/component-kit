import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Modal, Button } from '@hi-ui/hiui'

export default class FieldGroup extends Component {
  static propTypes = {
    main: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    main: false,
    id: 0
  }

  fieldsCache = []
  advancedFieldsCache = []

  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      fields: [],
      advancedFields: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.props.id) { // id 每个FieldGroup标识，改变时清空fields，并且强制渲染children
      this.resetFields()
    }
  }

  getChildContext () {
    return {
      component: this
    }
  }

  resetFields () {
    this.setState({
      advancedFields: [],
      fields: []
    })
  }

  addField (fieldName, advanced) {
    if (advanced) {
      this.state.advancedFields.push(fieldName)
    } else {
      this.state.fields.push(fieldName)
    }

    this.forceUpdate()
  }

  removeField (fieldName, advanced) {
    if (advanced) {
      const index = this.state.advancedFields.indexOf(fieldName)

      this.state.advancedFields.splice(index, 1)
    } else {
      const index = this.state.fields.indexOf(fieldName)

      this.state.fields.splice(index, 1)
    }

    this.forceUpdate()
  }

  renderManage () {
    if (this.props.main) {
      return (
        <div
          className='block-filter-form__manage'
          onClick={() => {
            this.fieldsCache = this.state.fields.slice(0)
            this.advancedFieldsCache = this.state.advancedFields.slice(0)
            this.setState({ showModal: true })
          }}
        >
          <Icon name='set' />
            管理
        </div>
      )
    }
  }

  render () {
    const {
      children,
      main,
      id
    } = this.props
    const {
      showModal,
      fields,
      advancedFields
    } = this.state

    return (
      <React.Fragment>
        <div className='block-filter-form__group'>
          <div className='block-filter-form__fields' key={id}>
            {children}
          </div>
        </div>

        {main && this.renderManage()}

        {
          main &&
          <Modal
            title='管理'
            show={showModal}
            backDrop
            width='720px'
            onConfirm={() => {
              this.setState({
                showModal: false
              })
            }}
            onCancel={() => {
              this.setState({
                fields: this.fieldsCache,
                advancedFields: this.advancedFieldsCache,
                showModal: false
              })
            }}>
            <div className='block-field block-field--selected'>
              <div className='block-field__label'>
                已选
              </div>
              <div className='block-field__list'>
                {
                  fields.map((field, index) => (
                    <Button type='line' className='block-field__item' key={index} onClick={() => {
                      this.removeField(field, false)
                      this.addField(field, true)
                    }}>
                      {field}
                      <Icon className='block-field__icon' name='minus' />
                    </Button>
                  ))
                }
              </div>
            </div>
            <div className='block-field'>
              <div className='block-field__label'>
                未选
              </div>
              <div className='block-field__list'>
                {
                  advancedFields.map((field, index) => (
                    <Button className='block-field__item' key={index} onClick={() => {
                      this.removeField(field, true)
                      this.addField(field, false)
                    }}>
                      {field}
                      <Icon className='block-field__icon' name='plus' />
                    </Button>
                  ))
                }
              </div>
            </div>
          </Modal>
        }
      </React.Fragment>
    )
  }
}

FieldGroup.childContextTypes = {
  component: PropTypes.any
}
