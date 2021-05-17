import React from "react";
import {SVG} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaults = {
      containerSize: {
        width: 500,
        height: 500,
      },
      settings: {
        roomSize: {
          width: 5000,
          height: 5000,
        },
        doorWidth: 700,
      }
    };
    this.state = {};
  }

  componentDidMount() {
    this.draw = SVG()
        .addTo(this.container)
        .size(this.container.clientWidth, this.container.clientHeight)
        .on('drop', this.dropImg);

    const draw = this.draw;
    const {roomSize, doorWidth} = this.defaults.settings;

    this.roomSize = {
      width: draw.text(roomSize.width.toString()).move(50, 510),
      height: draw.text(roomSize.height.toString()).move(510, 50)
    }

    this.room = draw
      .rect(roomSize.width, roomSize.height)
      .fill(`#F7F5F4`);

    this.door = draw
        .line(0, 0, doorWidth, 0)
        .stroke({ color: '#f06', width: 100 });
    this.door.draggable().on('dragmove.namespace', e => {
      e.preventDefault();
      const { handler, box } = e.detail;
      let { x, y } = box;
      if (y > 0){
        y = 0
      }
      handler.move(x, y)
    });

    var lamp = draw.image('lamp.png')
        .size(2000, 2000)
        .move(150, 150)

    this.roomContent = draw.group();
    this.roomContent.add(this.room);
    this.roomContent.add(this.door);
    this.roomContent.add(lamp);
    this.recalculateScale();
  }

  recalculateScale = () => {
    const scaleWidth = this.defaults.containerSize.width/this.room.width();
    const scaleHeight = this.defaults.containerSize.height/this.room.height();
    const scale = Math.min(scaleWidth, scaleHeight);
    this.roomContent.transform({scale, origin: {x: 0, y: 0}});
  }

  changeRoomWidth = e => {
    e.preventDefault();
    const width = parseInt(e.target.value);
    this.roomSize.width.text(width.toString());
    this.room.width(width);
    this.recalculateScale();
  }
  changeRoomHeight = e => {
    e.preventDefault();
    const height = e.target.value;
    this.roomSize.height.text(height.toString());
    this.room.height(height);
    this.recalculateScale();
  }

  changeDoorSize = e => {
    e.preventDefault();
    const width = e.target.value;
    this.door.width(width);
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
    image
        .size(200, 200)
        .move(150, 150)
        .draggable();
  }

  render() {
    const {roomSize, doorWidth} = this.defaults.settings;
    return (
        <div style={{display: `grid`, gridTemplateColumns: `1fr 1fr`}}>
          <div>
            <h1>settings</h1>
            <div>
              room size
              <input onChange={this.changeRoomWidth} type={`number`} step={1000} defaultValue={roomSize.width}/>
              <input onChange={this.changeRoomHeight} type={`number`} step={1000} defaultValue={roomSize.height}/>
            </div>
            <div>
              door width
              <input onChange={this.changeDoorSize} type={`number`} step={100} defaultValue={doorWidth}/>
            </div>
            <div>
              image to drag:
              <img src={`sofa.png`}  draggable="true" onDragStart={this.dragImg}/>
            </div>
          </div>
          <div id={`container`}
               ref={(container) => {this.container = container}}
               style={{height: `100vh`, width: `100%`}}
               onDragOver={this.allowDrop}
          >
          </div>
        </div>

    );
  }
}

export default App;
