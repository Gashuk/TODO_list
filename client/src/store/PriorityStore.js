import {makeAutoObservable} from "mobx";


export default class PriorityStore {
    constructor() {
        this._priority = []// список приоритетов

        makeAutoObservable(this)
    }

    setPriority(priority) {
        this._priority = priority
    }

    get priority() {
        return this._priority
    }
}