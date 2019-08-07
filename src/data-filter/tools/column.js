import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@hi-ui/hiui'

export default class ColumnTool extends Component {
  parent () {
    return this.context.component
  }

  render () {
    const parent = this.parent()

    return (
      <div className='block-filter-tool__menu block-filter-tool__menu--columns'>
        {
          parent.state.columns.map((column, index) => (
            <div
              className='block-filter-tool__menu-item'
              key={index}
            >
              <Checkbox
                checked={!column.hide}
                onChange={() => {
                  column.hide = !column.hide
                  const filteredColumns = parent.filterColumns()

                  if (this.props.onChange) {
                    this.props.onChange(filteredColumns)
                  } else {
                    parent.setState({ filteredColumns })
                  }
                }}
              >
                {column.title}
              </Checkbox>
            </div>
          ))
        }
      </div>
    )
  }
}

ColumnTool.contextTypes = {
  component: PropTypes.any
}
