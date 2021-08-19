/*
store required information, such as Token, using window.localStorage
*/

class Storage {
    constructor(prefix) {
        this.prefix = prefix;
    }

    exists(name) {
        return this.get(name) !== null;
    }

    get(name) {
        let value = window.localStorage.getItem(this.prefix + name);

        if (value && value[0] === "{") {
            value = JSON.parse(value);
        }
        return value;
    }

    set(name, content) {
        try {
            if (typeof content === "object") {
                content = JSON.stringify(content);
            }
            window.localStorage.setItem(this.prefix + name, content);
        } catch (exception) {
            return false;
        }

        return true;
    }

    clear() {
        window.localStorage.clear();
    }

    remove(name) {
        window.localStorage.removeItem(this.prefix + name);
        return true;
    }

    rename(originalName, newName) {
        let content = this.get(originalName);

        if (!this.set(newName, content)) {
            return false;
        }

        this.remove(originalName);

        return true;
    }
}

export default Storage;