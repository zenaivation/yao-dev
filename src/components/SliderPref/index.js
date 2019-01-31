import React, { PureComponent, Fragement } from 'react'
import InputRange from 'react-input-range';


class SliderPref extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 3 };
  }

  render() {
    return (
     <div class="slider-container">
        <label>Level of spicy</label>
        <InputRange
          maxValue={5}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })} />
      </div>
    );
  }
}

export default SliderPref;

