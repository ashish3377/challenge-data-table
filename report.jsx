var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

// The data is loaded from the json file
var rows = require('./data.json') 


// The set the filter value for the table.
var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'},
  {value: 'uaBrowser', title: 'Browser'},
  {value: 'uaBrowserVersion', title: 'Version'},
  {value: 'uaOS', title: 'Operation System'}
]


//To count the number of impression, load and display and return all the value
var reduce = function(row, memo) {
if(row.type=='impression'){
  memo.impression = (memo.impression || 0) + 1
}else if(row.type=='load'){
   memo.load = (memo.load || 0) + 1
}else if(row.type=='display'){
 memo.display = (memo.display || 0) + 1
}
  
  return memo
}

// To perform the calculations in order to get load rate and display rate
var calculations = [
  {
    title: 'Impression', // to set 
    value: 'impression',
    className: 'alignRight'
  },
  {
    title: 'Load',
    value: 'load',
    className: 'alignRight'
  },
  {
    title: 'Display',
    value: 'display',
    className: 'alignRight'
  },
  
  {
    title: 'Load Rate', // Load rate calculations
    value: function(row) {
      return (row.load / row.impression)*100 
    },
    template: function(val, row) {
      return  val.toFixed(1) + '%'
    },
    className: 'alignRight'
  },
  {
    title: 'Display Rate', // Display rate calculations
    value: function(row) {
      return row.display / row.load *100
    },
    template: function(val, row) {
      return  val.toFixed(1) + '%'
    },
    className: 'alignRight'
  }
]

var Report = createReactClass({
  getInitialState: function() {
    return {showInput: false}
  },
  toggleShow: function() {
    var showInput = this.state.showInput
    this.setState({showInput: !showInput})
  },
  render: function() {
    return (
      <div className='demo'>
        <div className={this.state.showInput ? 'hide' : ''}>
          <ReactPivot rows={rows}
                      dimensions={dimensions}
                      calculations={calculations} 
                      reduce={reduce}
                      activeDimensions={['Date','Host']} 
                      nPaginateRows={20} />
        </div>

       
      </div>
    )
  }
})

module.exports = createReactClass({
  render () {
    return <div><Report /></div>
  }
})



