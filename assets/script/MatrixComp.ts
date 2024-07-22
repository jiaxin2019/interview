import { _decorator, color, Component, EditBox, instantiate, math, Node, NodeEventType } from 'cc';
import { IMatrixItem, MatrixItem } from './MatrixItem';
import { ButtonLock } from './Tool';
const { ccclass, property } = _decorator;

@ccclass('MatrixComp')
export class MatrixComp extends Component {
    //⾸先⾃由定义 5 种颜⾊
    private colors = [
        "#38CC96"
        , "#149F0A"
        , "#AC4133"
        , "#1A39B3"
        , "#8C5C1F"]
    //每个点可选 5 种颜⾊中的 1种
    private random = 0;
    
    private xEB: EditBox = null!;
    private yEB: EditBox = null!;
    
    private m: number;
    private n: number;

    private mnColor: string;
    private mnColor1: string;

    private basePer = 20;
    private perMap: Map<string, number> = new Map();
    start() {
       
        this.node.getChildByName("creatBtn").on(NodeEventType.TOUCH_END,this.onTouch,this);
        this.xEB = this.node.getChildByPath("xEB")?.getComponent(EditBox)!
        this.yEB = this.node.getChildByPath("yEB")?.getComponent(EditBox)!
    }

    @ButtonLock()
    private onTouch() {
        console.warn("creatBtn", this.xEB.string, this.yEB.string);
        if (!this.xEB.string || !this.yEB.string) {
            return;
        }
        this.m = +this.xEB.string;
        this.n = +this.yEB.string;
        this.creatNode();
    }

    private creatNode() {
        this.initWid();
        let parNode = this.node.getChildByPath("parNode");
        let childNode = this.node.getChildByPath("childNode");
        parNode.destroyAllChildren();
        for (let i = 1; i <= 10; i++){
            for (let j = 1; j <= 10; j++) {
                const child = instantiate(childNode);
                let ts = child.addComponent(MatrixItem);
                let id = `${i}_${j}`;
                let colorStr;
                if (i == 1 && j == 1) {
                    colorStr = this.ranomColor;
                } else if(i == this.m && j == this.n - 1){
                    colorStr = this.mnColor;
                } else if (i == this.m && j == this.n - 1) {
                    colorStr = this.mnColor1;
                } else {
                    colorStr = this.weightedChoice();
                }
                let color = new math.Color(colorStr);
                let data: IMatrixItem = {
                    id,
                    color
                }
                ts.updata(data);
                child.active = true;
                child.parent = parNode;
            }
        }
    }

    private initWid() {
        this.perMap.clear();
        let colorStr = this.ranomColor;
        let colorStr1 = this.ranomColor;
        this.mnColor = colorStr;
        this.mnColor1 = colorStr1;
        if (colorStr == colorStr1) {
            this.perMap.set(colorStr, this.basePer + this.n);
            this.perMap.set(colorStr1, this.basePer + this.n);
        } else {
            this.perMap.set(colorStr, this.basePer + this.m);
            this.perMap.set(colorStr1, this.basePer + this.m);
        }

        let leftPer =( 100 - this.perMap.get(colorStr) - this.perMap.get(colorStr1)) / 3;
        this.colors.forEach((color) => {
            if (!this.perMap.has(color)) {
                this.perMap.set(color,leftPer);
            }
        })
    }

    private get ranomColor() {
        let random = Math.random();
        let index = Math.floor(random * 5)
        this.random = random;
        let ranomColor = this.colors[index];
        return ranomColor;
    }


    private weightedChoice() {
        let randomNum = Math.random() * 100;
        let cumulativeWeight = 0;
        for (let i = 0; i < this.colors.length; i++) {
            let color = this.colors[0];
            cumulativeWeight += this.perMap.get(color);
            if (randomNum < cumulativeWeight) {
                return this.colors[i];
            }
        }

        // 保险措施：如果没有选中任何颜色（理论上不应该发生），返回第一个颜色
        let ranomColor = this.colors[0];
        return ranomColor;
    }
}


