import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimeComplexityComp')
export class TimeComplexityComp extends Component {
    private arr1 = [10, 40, 5, 280];
    private arr2 = [234, 5, 2, 148, 23];
    private tarNum = 42;

    start() {
        //第一种方法：时间复杂度：O（n）* O(m)
        console.log("第一种方法:", this.func1());
    }

    private func1() {
        let len1 = this.arr1.length;
        let len2 = this.arr2.length;
        for (let i = 0; i < len1; i++) {
            const element1 = this.arr1[i];
            if (element1 > this.tarNum) {
                continue;
            }
            for (let j = 0; j < len2; j++) {
                const element2 = this.arr2[j];
                if (element1 + element2 == this.tarNum) {
                    return true;
                }
            }

        }
        return false;
    }

    update(deltaTime: number) {

    }
}


