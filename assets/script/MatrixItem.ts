import { _decorator, Color, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MatrixItem')
export class MatrixItem extends Component {
    private data: IMatrixItem =null!
    start() {

    }

    updata(data: IMatrixItem) {
        this.data = data;
        this.node.getChildByName("xyLab").getComponent(Label).string = data.id;
        this.node.getChildByName("backSS").getComponent(Sprite).color = data.color ;

    }
}

export interface IMatrixItem{
    id: string,
    color:Color
}


