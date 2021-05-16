import React from "react";
import {SVG} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.defaults = {
      roomSize: {
        width: 500,
        height: 500,
      },
      doorWidth: 70
    };
  }

  componentDidMount() {
    this.draw = SVG().addTo('#container').size(`100%`, `100%`);
    const draw = this.draw;

    const {roomSize, doorWidth} = this.defaults;

    this.room = draw
      .rect(roomSize.width, roomSize.height)
      .fill(`#F7F5F4`);


    this.door = draw.line(0, 0, doorWidth, 0).stroke({ color: '#f06', width: 10 });
    this.door.draggable().on('dragmove.namespace', e => {
      e.preventDefault();
      const { handler, box } = e.detail;
      let { x, y } = box;
      if (y > 0){
        y = 0
      }
      handler.move(x, y)
    })


  }

  changeRoomWidth = e => {
    e.preventDefault();
    const width = e.target.value;

    this.room.width(width);
  }
  changeRoomHeight = e => {
    e.preventDefault();
    const height = e.target.value;

    this.room.height(height);
  }

  changeDoorSize = e => {
    e.preventDefault();
    const width = e.target.value;
    this.door.width(width);
    //this.door.plot(0, 0, width, 0);
  }

  allowDrop = e => {
    e.preventDefault();
  }
  dragImg = e => {
    e.dataTransfer.setData('imgSrc', e.target.src);
  }
  dropImg = (e, _) => {
    e.preventDefault();
    var image = this.draw.image(e.dataTransfer.getData("imgSrc"))
    image.size(200, 200).move(150, 150).draggable();
  }

  render() {
    const {roomSize, doorWidth} = this.defaults;
    return (
        <div style={{display: `grid`, gridTemplateColumns: `1fr 1fr`}}>
          <div>
            <h1>settings</h1>
            <div>
              room size
              <input onChange={this.changeRoomWidth} type={`number`} defaultValue={roomSize.width}/>
              <input onChange={this.changeRoomHeight} type={`number`} defaultValue={roomSize.height}/>
            </div>
            <div>
              door width
              <input onChange={this.changeDoorSize} type={`number`} defaultValue={doorWidth}/>
            </div>
            <div>
              image to drag:
              <img src={`sofa.png`}  draggable="true" onDragStart={this.dragImg}/>
            </div>
          </div>
          <div id={`container`} style={{height: 500, width: 500}} onDragOver={this.allowDrop}  onDrop={this.dropImg}>
          </div>
        </div>

    );
  }
}

export default App;
