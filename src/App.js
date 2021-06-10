import "./styles.css";
import React from "react";
import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaults = {
      containerSize: {
        width: 500,
        height: 500
      },
      settings: {
        roomSize: {
          width: 5000,
          height: 5000
        },
        doorWidth: 700
      }
    };
    this.state = {};
  }

  componentDidMount() {
    this.draw = SVG()
        .addTo(this.container)
        .size(this.container.clientWidth - 50, this.container.clientWidth - 50)
        .on("drop", this.dropImg);

    const draw = this.draw;
    const { roomSize, doorWidth } = this.defaults.settings;

    /*this.roomSize = {
      width: draw.text(roomSize.width.toString()).move(50, 510),
      height: draw.text(roomSize.height.toString()).move(510, 50)
    };*/

    this.room = draw
        .rect(roomSize.width, roomSize.height)
        .fill(`#F7F5F4`);

    var floorPattern = draw.pattern(2500, 2000, function(add) {
      add.rect(2500, 2000).fill(`floor.jpeg`).transform({scale: 10})
    });
    this.floorTexture = draw
        .rect(roomSize.width - 100, roomSize.height - 100)
        .move(50, 50)
        .fill(floorPattern);

    this.door = draw
        .line(0, 0, doorWidth, 0)
        .stroke({ color: "brown", width: 150 })
        .css({ cursor: "pointer" });
    this.door.draggable().on("dragmove.namespace", (e) => {
      e.preventDefault();
      const { handler, box } = e.detail;
      let { x, y } = box;
      if (y > 0) {
        y = 0;
      }
      handler.move(x, y);
    });

    var lamp = draw
        .image("lamp.png")
        .size(1300, 1300)
        .move(250, 250)
        .draggable()
        .css({ cursor: "pointer" });

    this.roomContent = draw.group();
    this.roomContent.add(this.room);

    this.floor = draw.group();
    this.roomContent.add(this.floorTexture);
    this.roomContent.add(this.floor);

    this.roomContent.add(this.door);

    this.furniture = draw.group("furniture");
    this.roomContent.add(this.furniture);
    this.furniture.add(lamp);

    this.recalculateScale();
  }

  recalculateScale = () => {
    const scaleWidth = this.defaults.containerSize.width / this.room.width();
    const scaleHeight = this.defaults.containerSize.height / this.room.height();
    const scale = Math.min(scaleWidth, scaleHeight);
    this.roomContent.transform({ scale, origin: { x: 0, y: 0 } });
  };

  changeRoomWidth = (e) => {
    e.preventDefault();
    const width = parseInt(e.target.value);
    //this.roomSize.width.text(width.toString());
    this.room.width(width);
    this.recalculateScale();
  };
  changeRoomHeight = (e) => {
    e.preventDefault();
    const height = e.target.value;
    //this.roomSize.height.text(height.toString());
    this.room.height(height);
    this.recalculateScale();
  };

  changeDoorSize = (e) => {
    e.preventDefault();
    const width = e.target.value;
    this.door.width(width);
  };

  allowDrop = (e) => {
    e.preventDefault();
  };
  dragImg = (e) => {
    e.dataTransfer.setData("imgSrc", e.target.src);
    //this.setState({ imgTransfer: e.target.src });
  };
  dropImg = (e, _) => {
    e.preventDefault();
    var image = this.draw.image(e.dataTransfer.getData("imgSrc"));
    //var image = this.draw.image(this.state.imgTransfer);
    image
        .size(2000, 2000)
        .move(1500, 350)
        .css({ cursor: "pointer" })
        .draggable();
    this.roomContent.add(image);
  };

  addTable = (e) => {
    e.preventDefault();
    var image = this.draw.image("table.png");
    image
        .size(1000, 1000)
        .move(1200, 800)
        .css({ cursor: "pointer", zIndex: 10 })
        .draggable();
    this.furniture.add(image);
  };
  addCarpet = (e) => {
    e.preventDefault();
    var image = this.draw.image("carpet.png");

    image
        .size(2500, 2500)
        .move(`10%`, `10%`)
        .css({ cursor: "pointer" })
        .draggable();
    this.floor.add(image);
  };

  render() {
    const { roomSize, doorWidth } = this.defaults.settings;
    return (
        <div className={`wrapper`}>
          <div className={`settings`}>
            <h3>Settings</h3>
            <div>
              Room size
              <input
                  onChange={this.changeRoomWidth}
                  type={`number`}
                  step={1000}
                  defaultValue={roomSize.width}
              />
              <input
                  onChange={this.changeRoomHeight}
                  type={`number`}
                  step={1000}
                  defaultValue={roomSize.height}
              />
            </div>
            <div>
              Door width
              <input
                  onChange={this.changeDoorSize}
                  type={`number`}
                  step={100}
                  defaultValue={doorWidth}
              />
            </div>
            <div className={`furniture-items__wrap`}>
              <div className={`furniture-item`}>
                <img src={`table.png`} />
                <button onClick={this.addTable}>Add</button>
              </div>
              <div className={`furniture-item`}>
                <img src={`carpet.png`} />
                <button onClick={this.addCarpet}>Add</button>
              </div>
            </div>
            <div className="img-drag__wrapper">
              Test drag-and-drop image (desktop only):
              <div>
                <img
                    className="img--drag"
                    src={`sofa.png`}
                    draggable="true"
                    onDragStart={this.dragImg}
                    //onTouchMove={this.dragImg}
                />
              </div>
            </div>
          </div>
          <div
              id={`container`}
              ref={(container) => {
                this.container = container;
              }}
              onDragOver={this.allowDrop}
          ></div>
        </div>
    );
  }
}

export default App;
