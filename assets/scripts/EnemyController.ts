import { _decorator, CCFloat, Component, Node, randomRangeInt, TiledLayer, Tween, tween, UITransform, Vec3 } from 'cc';
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

    @property(UITransform)
    playerUITransform: UITransform = null;

    _preNode: Node = null;

    start() {
        Vec3.add(this.node.position, this.tiledLayer.getTiledTileAt(this.col, this.row, true).node.position, new Vec3(50, 50, 0));

        this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
        //this.makeMove(this.col, this.row + 1);
        this.checkContinueMove();
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
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to right
                    this.makeMove(this.col + 1, this.row);
                    return;
                }

                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to bot
                    this.makeMove(this.col, this.row + 1);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomLeftTop = randomRangeInt(1, 3);

                    if (randomLeftTop === 1) {
                        //move to right
                        this.makeMove(this.col + 1, this.row);
                    }
                    if (randomLeftTop === 2) {
                        //move to bot
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                break;

            case TypeBlocks.TOP_RIGHT:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to left
                    this.makeMove(this.col - 1, this.row);
                    return;
                }

                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to bot
                    this.makeMove(this.col, this.row + 1);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomTopRight = randomRangeInt(1, 3);

                    if (randomTopRight === 1) {
                        //move to left
                        this.makeMove(this.col - 1, this.row);
                    }
                    if (randomTopRight === 2) {
                        //move to bot
                        this.makeMove(this.col, this.row + 1);
                    }
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
                    return;
                }

                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to bot
                    if (random === 1) {
                        this.makeMove(this.col, this.row + 1);
                    }
                    //move to right
                    if (random === 2) {
                        this.makeMove(this.col + 1, this.row);
                    }
                    return;
                }

                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;

                    let random = randomRangeInt(1, 3);

                    //move to bot
                    if (random === 1) {
                        this.makeMove(this.col, this.row + 1);
                    }
                    //move to left
                    if (random === 2) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomTop = randomRangeInt(1, 4);

                    //move to bot
                    if (randomTop === 1) {
                        this.makeMove(this.col, this.row + 1);
                    }
                    //move to left
                    if (randomTop === 2) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    //move to right
                    if (randomTop === 3) {
                        this.makeMove(this.col + 1, this.row);

                    }
                }

                break;

            case TypeBlocks.LEFT_BOT2 || TypeBlocks.LEFT_BOT:
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to top
                    this.makeMove(this.col, this.row - 1);
                    return;
                }

                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to right
                    this.makeMove(this.col + 1, this.row);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomLeftBot = randomRangeInt(1, 3);

                    if (randomLeftBot === 1) {
                        //move to top
                        this.makeMove(this.col, this.row - 1);
                    }
                    if (randomLeftBot === 2) {
                        //move to right
                        this.makeMove(this.col + 1, this.row);
                    }
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
                    return;
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
                    return;
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
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomLeft = randomRangeInt(1, 4);

                    //move to top
                    if (randomLeft === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to right
                    if (randomLeft === 2) {
                        this.makeMove(this.col + 1, this.row);
                    }
                    //move to bot
                    if (randomLeft === 3) {
                        this.makeMove(this.col, this.row + 1);
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
                    return;
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
                    return;
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
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomRight = randomRangeInt(1, 4);

                    //move to top
                    if (randomRight === 1) {
                        this.makeMove(this.col, this.row - 1);
                    }
                    //move to left
                    if (randomRight === 2) {
                        this.makeMove(this.col - 1, this.row);
                    }
                    //move to bot
                    if (randomRight === 3) {
                        this.makeMove(this.col, this.row + 1);
                    }
                }

                break;

            case TypeBlocks.BOT_RIGHT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this.col - 1, this.row, true).node;
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to top
                    this.makeMove(this.col, this.row - 1);
                    return;
                }

                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to left
                    this.makeMove(this.col - 1, this.row);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomBotRight = randomRangeInt(1, 3);

                    if (randomBotRight === 1) {
                        //move to top
                        this.makeMove(this.col, this.row - 1);
                    }
                    if (randomBotRight === 2) {
                        //move to left
                        this.makeMove(this.col - 1, this.row);
                    }
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
                checkNodeRight = this.tiledLayer.getTiledTileAt(this.col + 1, this.row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to right
                    this.makeMove(this.col + 1, this.row);
                    return;
                }

                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to left
                    this.makeMove(this.col - 1, this.row);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomTopBot = randomRangeInt(1, 3);

                    if (randomTopBot === 1) {
                        //move to right
                        this.makeMove(this.col + 1, this.row);
                    }
                    if (randomTopBot === 2) {
                        //move to left
                        this.makeMove(this.col - 1, this.row);
                    }
                }

                break;

            case TypeBlocks.LEFT_RIGHT:
                checkNodeTop = this.tiledLayer.getTiledTileAt(this.col, this.row - 1, true).node;
                checkNodeBot = this.tiledLayer.getTiledTileAt(this.col, this.row + 1, true).node;
                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to bot
                    this.makeMove(this.col, this.row + 1);
                    return;
                }

                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this.col, this.row, true).node;
                    //move to top
                    this.makeMove(this.col, this.row - 1);
                    return;
                }

                if (this._preNode === this.tiledLayer.getTiledTileAt(this.col, this.row, true).node) {
                    let randomLeftRight = randomRangeInt(1, 3);

                    if (randomLeftRight === 1) {
                        //move to bot
                        this.makeMove(this.col, this.row + 1);
                    }
                    if (randomLeftRight === 2) {
                        //move to top
                        this.makeMove(this.col, this.row - 1);
                    }
                }

                break;
        }
    }

    update(dt: number) {
        let boundingBox = this.node.getComponent(UITransform).getBoundingBox();
        if (boundingBox.intersects(this.playerUITransform.getBoundingBox())) {
            Tween.stopAll();

            //send event to LevelController to stop player
            this.playerUITransform.node.emit("hit enemy");

            this.update = () => { };
        }
    }
}
