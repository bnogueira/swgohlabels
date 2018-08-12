
class AuthStatus {
    constructor() {
        this.status = null;
        this.NotStarted = "Not Started";
        this.InProgress = "In progress";
        this.Error = "Error";
        this.Valid = "Valid";

        this.status = this.NotStarted;
    }

    log()
    {
        console.log("AuthStatus: " + this.status);
    }

    changeToInProgress() {
        return this.status = this.InProgress;
    }

    changeToError() {
        return this.status = this.Error;
    }

    changeToValid() {
        return this.status = this.Valid;
    }

    isNotStarted() {
        return this.status == this.NotStarted;
    }

    isInProgress() {
        return this.status == this.InProgress;
    }

    isError() {
        return this.status == this.Error;
    }

    isValid() {
        return this.status == this.Valid;
    }
}

var staticAuthStatus = new AuthStatus();