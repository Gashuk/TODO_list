import {makeAutoObservable} from "mobx";


export default class StatusStore {
    constructor() {
        this._status = []// список статусов

        makeAutoObservable(this)
    }


    setStatus(status) {
        this._status = status
    }

    get status() {
        return this._status
    }
}