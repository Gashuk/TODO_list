import {makeAutoObservable} from "mobx";


export default class PurposeStore {
    constructor() {
        this._purpose = []//список данных подчиненных авторизованного пользователя
        this._isSupervisor = false// руководитель или нет авторизованный пользователь

        makeAutoObservable(this)
    }

    setPurpose(purpose) {
        this._purpose = purpose
    }

    get purpose() {
        return this._purpose
    }

    setIsSupervisor(isSupervisor) {
        this._isSupervisor = isSupervisor
    }

    get isSupervisor() {
        return this._isSupervisor
    }
}