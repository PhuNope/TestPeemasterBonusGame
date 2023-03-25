import { _decorator, CCFloat, Component, Node, randomRangeInt, TiledLayer, tween, Vec3 } from 'cc';
import { TypeBlocks } from './utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({ type: CCFloat })
    col: number = 0;
    @property({ type: CCFloat })
    row: number = 0;

    @property(TiledLayer)
    tiledLayer: TiledLayer = null;

    _preNode: Node = null;

    start() {
        Vec3.add(this.node.position, this.tiledLayer.getTiledTileAt(this.col, this.row, true).node.position, new Vec3(50, 50, 0));

        this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
        this.makeMove(this.col, this.row + 1);
    }

    makeMove(col: number, row: number) {
        let pos: Vec3 = new Vec3();
        Vec3.add(pos, this.tiledLayer.getTiledTileAt(col, row, true).node.position, new Vec3(50, 50, 0));
        let that = this;

        tween(this.node.position)
            .to(0.5, pos, {
                onUpdate(target: Vec3, ratio) {
                    that.node.position = target;
                },
            })
            .call(() => {
                this.col = col;
                this.row = row;

                this.checkContinueMove();
            })
            .start();
    }

    checkContinueMove() {
        let checkNodeLeft: Node = null;
        let checkNodeTop: Node = null;
        let checkNodeRight: Node = null;
        let checkNodeBot: Node = null;

        switch (this.tiledLayer.getTiledTileAt(this.col, this.row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col + 1, this.row);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col, this.row + 1);
                }
                break;

            case TypeBlocks.TOP_RIGHT:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col - 1, this.row);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col, this.row + 1);
                }
                break;

            case TypeBlocks.TOP:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;

                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to left
                    if (random === 1) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    //move to right
                    if (random === 2) {
                        this.makeMove(this.col + 1, this.row);
                    }
                }

                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to top
                    if (random === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to right
                    if (random === 2) {
                        this.makeMove(this.col + 1, this.row);
                    }
                }

                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to top
                    if (random === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to left
                    if (random === 2) {
                        this.makeMove(this.col - 1, this.row);
                    }
                }

                break;

            case TypeBlocks.LEFT_BOT2 && TypeBlocks.LEFT_BOT:
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;
                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col, this.row - 1);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col + 1, this.row);
                }
                break;

            case TypeBlocks.LEFT:
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;

                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to top
                    if (random === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to bot
                    if (random === 2) {
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to right
                    if (random === 1) {
                        this.makeMove(this.col + 1, this.row);
                    }
                    //move to bot
                    if (random === 2) {
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to right
                    if (random === 1) {
                        this.makeMove(this.col + 1, this.row);
                    }
                    //move to top
                    if (random === 2) {
                        this.makeMove(this.col, this.row - 1);
                    }
                }

                break;

            case TypeBlocks.RIGHT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;

                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to top
                    if (random === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to bot
                    if (random === 2) {
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to left
                    if (random === 1) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    //move to bot
                    if (random === 2) {
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to left
                    if (random === 1) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    //move to top
                    if (random === 2) {
                        this.makeMove(this.col, this.row - 1);
                    }
                }

                break;

            case TypeBlocks.BOT_RIGHT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;;
                    this.makeMove(this.col, this.row - 1);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    this.makeMove(this.col - 1, this.row);
                }
                break;

            case TypeBlocks.LEFT_BOT_RIGHT:
                this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                //move to top
                this.makeMove(this.col, this.row - 1);

                break;

            case TypeBlocks.TOP_LEFT_BOT:
                this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                //move to right
                this.makeMove(this.col + 1, this.row);

                break;

            case TypeBlocks.LEFT_TOP_RIGHT:
                this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                //move to bot
                this.makeMove(this.col, this.row + 1);

                break;

            case TypeBlocks.TOP_RIGHT_BOT:
                this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                //move to left
                this.makeMove(this.col - 1, this.row);

                break;

            case TypeBlocks.EMPTY:

                break;

            case TypeBlocks.TOP_BOT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to right
                    this.makeMove(this.col + 1, this.row);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to left
                    this.makeMove(this.col - 1, this.row);
                }
                break;

            case TypeBlocks.LEFT_RIGHT:
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to bot
                    this.makeMove(this.col, this.row + 1);
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to top
                    this.makeMove(this.col, this.row - 1);
                }
        }
    }

}
