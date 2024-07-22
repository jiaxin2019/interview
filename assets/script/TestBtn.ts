import { _decorator, AnimationState, Animation, Component, isValid, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestBtn')
export class TestBtn extends Component {
    private anim: Animation = null!;
    protected onLoad(): void {
        this.node.getChildByName("button").on(NodeEventType.TOUCH_START, this.onClickStart, this);
        this.node.getChildByName("button").on(NodeEventType.TOUCH_END, this.onClickEnd, this);
        this.node.getChildByName("button").on(NodeEventType.TOUCH_CANCEL, this.onClickEnd, this);

        this.anim = this.node.getChildByName("button").getComponent(Animation);
    }

    private onClickStart() {
        this.anim.crossFade('clickStart', 0.1);
    }

    private onClickEnd() {
        this.anim.crossFade('clickEnd', 0.1);
    }

    protected onEnable(): void {
        this.listener(true);
    }

    protected onDisable(): void {
        this.listener(false);
    }

    private listener(isAdd: boolean): void {
        if (!isValid(this.node)) return;
        if (isAdd) {
            this.anim.on(Animation.EventType.FINISHED, this.onAnimComplete, this);
        } else {
            this.anim.off(Animation.EventType.FINISHED, this.onAnimComplete, this);
        }
    }

    private onAnimComplete(event: string, date: AnimationState): void {
        if (!isValid(this.node)) return;
        switch (date.name) {
            case "open":
                this.anim.crossFade('animation', 0.3);
                break;
            case "clickStart":
                this.anim.crossFade('click', 0.3);
                break;
            case "clickEnd":
                this.anim.crossFade('animation', 0.3);
                break;
        }
    }

    public play(): void {

        this.scheduleOnce(() => {
            if (!isValid(this.node)) return;
            console.log(`Anim 开始播放！！！！！！`);
            this.anim.play("anim");
        }, 6);
    }


    protected onDestroy(): void {
        this.anim = null;
    }
}


