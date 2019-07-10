class Task {

    constructor(data) {
        this.id = data && data.hasOwnProperty('_id') ? data._id : null;
        this.title = data && data.hasOwnProperty('title') ? data.title : null;
        this.description = data && data.hasOwnProperty('description') ? data.description : null;

    }
}
export default Task