import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio } from '@hi-ui/hiui'

export default class RowHeightTool extends Component {
  constructor (props) {
    super(props)
    const rowHeight = this.props.rowHeight

    this.state = {
      rowHeight
    }
  }

  componentDidMount () {
    this.parent().setState({ rowHeight: this.state.rowHeight })
  }

  parent () {
    return this.context.component
  }

  render () {
    const {
      onChange
    } = this.props
    const {
      rowHeight
    } = this.state
    const parent = this.parent()
    const list = [
      {
        id: 'small',
        name: '紧凑型',
        checked: rowHeight === 'small'
      }, {
        id: 'middle',
        name: '舒适型',
        checked: rowHeight === 'middle'
      }, {
        id: 'big',
        name: '宽敞型',
        checked: rowHeight === 'big'
      }
    ]

    return (
      <div className='block-filter-tool__menu block-filter-tool__menu--row-height'>
        <Radio
          legacy
          list={list}
          layout='vertical'
          onChange={val => {
            if (onChange) {
              onChange(val)
            } else {
              this.setState({ rowHeight: val })
              parent.setState({ rowHeight: val })
            }
          }}
        />
      </div>
    )
  }
}

RowHeightTool.contextTypes = {
  component: PropTypes.any
}
