import React, { Component } from 'react';
import { Row, Col, Icon, Radio, InputNumber } from 'antd';

const calculateVerticalLine = (long, short) => {
  return Number(Math.sqrt(Math.pow(long, 2) - Math.pow(short, 2))).toFixed(1)
}
//TODO 1三角形可拖动 3旋转角度
export default class Triangle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0,
      bWidth: '0 50px 86.6px',
      bColor: 'transparent transparent #592f95',
      width: 100,
      height: 100,
      color: '#592f95',
      direct: 'top'
    }
  }
  componentDidUpdate(){
    
  }
  returnIconStyle = (color) => {
    return { fontSize: 40, cursor: 'pointer', color }
  }
  onSetTriDirect = (color, direct) => {
    this.setState({ color, direct }, ()=> this.onCreateTri())
  }
  onCreateTri = () => {
    let bWidth, bColor, halfWidth = this.state.width / 2, width = this.state.width, color = this.state.color
    switch (this.state.direct) {
      case 'top':
        bWidth = `0 ${halfWidth}px ${calculateVerticalLine(width, halfWidth)}px`
        bColor = `transparent transparent ${color}`
        break;
      case 'bottom':
        bWidth = `${calculateVerticalLine(width, halfWidth)}px ${halfWidth}px 0`
        bColor = `${color} transparent transparent`
      case 'left':
        bWidth = `${halfWidth}px ${calculateVerticalLine(width, halfWidth)}px ${halfWidth}px 0`
        bColor = `transparent ${color} transparent transparent`
      case 'right':
        bWidth = `${halfWidth}px 0 ${halfWidth}px ${calculateVerticalLine(width, halfWidth)}px`
        bColor = `transparent transparent transparent ${color}`
      default:
        break;
    }
    this.setState({bWidth, bColor})
  }
  onWidthChange = width => {
    this.setState({ width })
    this.onCreateTri()
  }
  onHeightChange = height => {
    this.setState({ height })
    this.onCreateTri()
  }
  render() {
    return (
      <div className="triangle">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={8}>
            <section>
              <p className="subtitle">方向</p>
              <div className="direct-box">
                <Icon type="caret-up" className="i-top-left" style={this.returnIconStyle('#f11e27')} rotate="-45" onClick={() => this.onSetTriDirect('#f11e27', 'top-left')} />
                <Icon type="caret-up" className="i-top" style={this.returnIconStyle('#592f95')} onClick={() => this.onSetTriDirect('#592f95', 'top')} />
                <Icon type="caret-up" className="i-top-right" style={this.returnIconStyle('#0465b2')} rotate="45" onClick={() => this.onSetTriDirect('#0465b2', 'top-right')} />
                <br />
                <Icon type="caret-left" className="i-left" style={this.returnIconStyle('#f58225')} onClick={() => this.onSetTriDirect('#f58225', 'left')} />
                <Icon type="caret-right" className="i-right fr" style={this.returnIconStyle('#00acac')} onClick={() => this.onSetTriDirect('#00acac', 'right')} />
                <br />
                <Icon type="caret-down" className="i-bottom-left" style={this.returnIconStyle('#f8a51b')} rotate="45" onClick={() => this.onSetTriDirect('#f8a51b', 'bottom-left')} />
                <Icon type="caret-down" className="i-bottom" style={this.returnIconStyle('#fef102')} onClick={() => this.onSetTriDirect('#fef102', 'bottom')} />
                <Icon type="caret-down" className="i-bottom-right" style={this.returnIconStyle('#03a45e')} rotate="-45" onClick={() => this.onSetTriDirect('#03a45e', 'bottom-right')} />
              </div>
            </section>
            <section>
              <p className="subtitle">类型</p>
              <Radio.Group onChange={e => this.setState({ type: e.target.value })} value={this.state.type}>
                <Radio value={0}>等边</Radio>
                <Radio value={1}>等腰</Radio>
              </Radio.Group>
            </section>
            <section>
              <p className="subtitle">大小</p>
              <div>
                <label>宽度 </label>
                <InputNumber className="margin-right" min={1} max={300} onChange={this.onWidthChange} value={this.state.width} />
                <label>高度 </label>
                <InputNumber min={1} max={300} value={this.state.height} onChange={this.onHeightChange} disabled={!this.state.type} />
              </div>
            </section>
          </Col>
          <Col span={16}>
            <div className="tri-box">
              <div className="tri" style={{ borderWidth: this.state.bWidth, borderColor: this.state.bColor }}></div>
            </div>
          </Col>
        </Row>
        <section>
          <p className="subtitle">CSS</p>
          <div className="css-code">dddddddddd</div>
        </section>
      </div>
    )
  }
}