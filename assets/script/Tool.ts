
/**
 * 按钮点击限制节流
 * 使用：
 * @ButtonLock(1, () => { cc.error('fff') })
 * cccc() {
 *  cc.error('click_once')
 * }
 * @param lockTime 阻塞时间
 * @param callBackFun 节流回调 多次点击的时候给一个回调函数提示用户不要多次点击
 */
export function ButtonLock(lockTime: number = 0.3, callBackFun?: Function) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldFun: Function = descriptor.value
        let isLock: boolean = false
        descriptor.value = function (...args: any[]) {
            if (isLock) {
                callBackFun?.()
                return
            }
            isLock = true
            setTimeout(() => {
                isLock = false
            }, lockTime * 1000)
            oldFun.apply(this, args)
        }
        return descriptor
    }
}


