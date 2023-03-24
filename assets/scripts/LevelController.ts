import { _decorator, CCFloat, Component, EventTouch, Graphics, Node, TiledLayer, TiledMap, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum TypeBlocks {
    LEFT_TOP = 1,
    TOP_RIGHT = 2,
    TOP = 3,
    LEFT_BOT = 4,
    LEFT = 5,
    RIGHT = 6,
    LEFT_BOT2 = 7,
    BOT_RIGHT = 8,
    LEFT_BOT_RIGHT = 9,
    TOP_LEFT_BOT = 10,
    LEFT_TOP_RIGHT = 11,
    TOP_RIGHT_BOT = 12,
    EMPTY = 13,
    TOP_BOT = 14,
    LEFT_RIGHT = 15
}

enum DirectMove {
    LEFT,
    RIGHT,
    TOP,
    BOT
}

@ccclass('LevelController')
export class LevelController extends Component {
    @property(TiledLayer)
    tiledLayer: TiledLayer = null;

    @property(Node)
    nodes: Node = null;

    @property(Graphics)
    graphics: Graphics = null;

    _col = 0;
    _row = 4;

    _preNode: Node = null;

    _vecStart: Vec2 = null;

    _arrVec3Graph: Vec3[] = [];

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start() {
        Vec3.add(this.nodes.position, this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.position, new Vec3(50, 50, 0));

        this.graphics.moveTo(this.nodes.position.x, this.nodes.position.y);
        this._arrVec3Graph.push(this.nodes.position);
    }

    onTouchStart(event: EventTouch) {
        this._vecStart = event.getUILocation();
    }

    onTouchEnd(event: EventTouch) {
        let vecDirect: Vec2 = event.getUILocation().subtract(this._vecStart);

        let directMove = this.checkDirectMove(vecDirect);
        if (this.checkNodeCanMove(directMove)) {
            this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;

            switch (directMove) {
                case DirectMove.LEFT:
                    this._col--;
                    break;

                case DirectMove.RIGHT:
                    this._col++;
                    break;

                case DirectMove.TOP:
                    this._row--;
                    break;

                case DirectMove.BOT:
                    this._row++;
                    break;
            }

            this.makeMove();
        }
    }

    checkDirectMove(directVec: Vec2): DirectMove {
        if (directVec.x > 0 && Math.abs(directVec.x) > Math.abs(directVec.y)) return DirectMove.RIGHT;

        if (directVec.x < 0 && Math.abs(directVec.x) > Math.abs(directVec.y)) return DirectMove.LEFT;

        if (directVec.y > 0 && Math.abs(directVec.y) > Math.abs(directVec.x)) return DirectMove.TOP;

        if (directVec.y < 0 && Math.abs(directVec.y) > Math.abs(directVec.x)) return DirectMove.BOT;
    }

    checkNodeCanMove(directMove: DirectMove): boolean {
        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP) return false;
                return true;

            case TypeBlocks.TOP_RIGHT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP:
                if (directMove === DirectMove.TOP) return false;
                return true;

            case TypeBlocks.LEFT_BOT2 || TypeBlocks.LEFT_BOT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT:
                if (directMove === DirectMove.LEFT) return false;
                return true;

            case TypeBlocks.RIGHT:
                if (directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.BOT_RIGHT:
                if (directMove === DirectMove.BOT || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.LEFT_BOT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP_LEFT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.LEFT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT_TOP_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP_RIGHT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.EMPTY:
                return true;

            case TypeBlocks.TOP_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.RIGHT) return false;
                return true;
        }
    }

    makeMove() {
        //turn off touch
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);

        let pos: Vec3 = new Vec3();
        Vec3.add(pos, this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.position, new Vec3(50, 50, 0));
        let that = this;

        //graphics
        if (this._arrVec3Graph.slice(-2)?.[0] === pos) {
            this._arrVec3Graph.pop();
        }

        tween(this.nodes.position)
            .to(0.3, pos, {
                onUpdate(target: Vec3, ratio) {
                    that.nodes.position = target;

                    //graphics
                    that.graphics.clear();
                    that.graphics.moveTo(that._arrVec3Graph[0].x, that._arrVec3Graph[0].y);
                    for (let i = 1; i < that._arrVec3Graph.length; i++) {
                        that.graphics.lineTo(that._arrVec3Graph[i].x, that._arrVec3Graph[i].y);
                        that.graphics.moveTo(that._arrVec3Graph[i].x, that._arrVec3Graph[i].y);
                    }

                    that.graphics.lineTo(target.x, target.y);
                    that.graphics.stroke();
                },
            })
            .call(() => {
                this.checkContinueMove();

                //graphics
                if (this._arrVec3Graph.slice(-1)[0] !== pos) {
                    that.graphics.moveTo(pos.x, pos.y);
                    this._arrVec3Graph.push(pos);
                }

                //turn on touch
                this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            })
            .start();
    }

    checkContinueMove() {
        let checkNodeLeft: Node = null;
        let checkNodeTop: Node = null;
        let checkNodeRight: Node = null;
        let checkNodeBot: Node = null;

        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove();
                }
                break;

            case TypeBlocks.TOP_RIGHT:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove();
                }
                break;

            case TypeBlocks.LEFT_BOT2 || TypeBlocks.LEFT_BOT:
                checkNodeRight = this.tiledLayer.getTiledTileAt(this._col + 1, this._row, true).node;
                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                }
                break;

            case TypeBlocks.BOT_RIGHT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this._col - 1, this._row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                }
                break;

            case TypeBlocks.TOP_BOT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this._col - 1, this._row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                }
                break;

            case TypeBlocks.LEFT_RIGHT:
                checkNodeTop = this.tiledLayer.getTiledTileAt(this._col, this._row - 1, true).node;
                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                }
        }
    }

    update(deltaTime: number) {

    }
}